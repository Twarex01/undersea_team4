using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using StrategyGame.Bll.DTO;
using StrategyGame.Bll.Hubs;
using StrategyGame.Bll.Services.Hubs;
using StrategyGame.Dal;
using StrategyGame.Model;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
    public class RoundService : IRoundService
    {

        

        private AppDbContext _dbContext;
        private UserManager<User> _userManager;

        private IBattleService _battleService;
        private IHubContext<RoundHub, IRoundHubClient> _roundHubContext;
        private IDataService _dataService;


        public RoundService(AppDbContext dbContext, UserManager<User> userManager,
            IBattleService battleService, IDataService dataService, IHubContext<RoundHub,
                IRoundHubClient> roundHubContext)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _battleService = battleService;
            _roundHubContext = roundHubContext;
            _dataService = dataService;
        }

        private void GeneratePearlIncome(Country country)
        {
            var pearls = country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Pearl.ID);
            pearls.Amount += (int)Math.Truncate(pearls.ProductionBase * pearls.ProductionMultiplier);
            
        }

        private void GenerateCoralIncome(Country country)
        {
            var corals = country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Coral.ID);
            corals.Amount += (int)Math.Truncate(corals.ProductionBase * corals.ProductionMultiplier);
            
        }

        private void GenerateStoneIncome(Country country)
        {
            var stones = country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Stone.ID);
            stones.Amount += (int)Math.Truncate(stones.ProductionBase * stones.ProductionMultiplier);
           
        }

        private void PaySoldiers(Country country)
        {

            foreach (var unit in country.Units)
            {
                var resource = country.Resources.SingleOrDefault(c => c.ResourceDataID == unit.UnitData.SalaryUnitID);
                var resourcesLost = unit.UnitData.Salary * unit.Count;

                if (resource.Amount - resourcesLost >= 0)
                    resource.Amount -= resourcesLost;  
                else
                    resource.Amount = 0;
            }
            

        }

        private void FeedSoldiers(Country country)
        {

            foreach (var unit in country.Units)
            {
                var resource = country.Resources.SingleOrDefault(c => c.ResourceDataID == unit.UnitData.ConsumptionUnitID);
                var resourcesEaten = unit.UnitData.Consumption * unit.Count;

                if (resource.Amount - resourcesEaten >= 0)
                    resource.Amount -= resourcesEaten;  
                else
                    resource.Amount = 0;
            }
            

        }



        private void ProceedWithUpgrade(Country country)
        {
            var currentlyUpgrading = country.Upgrades.Where(u => u.Progress > 0).SingleOrDefault(); 
            if (currentlyUpgrading == null) return;
            currentlyUpgrading.Progress--;
            if (currentlyUpgrading.Progress == 0) currentlyUpgrading.UpgradeData.ApplyEffects(country);
            

        }
        private void ProceedWithBuilding(Country country)
        {
            var currentlyBuilding = country.Buildings.Where(u => u.Progress > 0).SingleOrDefault(); //elvileg nem lehet 1-nél több eredmény
            if (currentlyBuilding == null) return;
            currentlyBuilding.Progress--;
            if (currentlyBuilding.Progress == 0)
            {
                currentlyBuilding.Count++;
                currentlyBuilding.BuildingData.ApplyEffect(country);
                
            }
        }
        public async Task SimulateRound()
        {

            var countryList = await _dbContext.Countries
                .Include(c => c.Buildings).ThenInclude(b => b.BuildingData)
                .Include(c => c.Upgrades).ThenInclude(u => u.UpgradeData)
                .Include(c => c.Units).ThenInclude(u => u.UnitData)
                .Include(c => c.Resources).ThenInclude(r => r.ResourceData)
                .ToListAsync();

            // változások az egyes országokban
            foreach (var country in countryList)
            {
                GeneratePearlIncome(country);
                GenerateCoralIncome(country);
                GenerateStoneIncome(country);
                PaySoldiers(country);
                FeedSoldiers(country);
                ProceedWithUpgrade(country);
                ProceedWithBuilding(country);

            }

            //Harc
            var BattleIDs = await _dbContext.Battles.Select(b => b.ID).ToListAsync();
            foreach (var battleID in BattleIDs)
            {
                await _battleService.CommenceBattle(battleID);
            }
            //felfedezés
            var explorationIDs = await _dbContext.Explorations.Select(e => e.ID).ToListAsync();
            foreach(var expID in explorationIDs)
			{
                await _battleService.SimulateExploration(expID);
			}

            //pont számolás
            foreach (var country in countryList)
            {
                country.Score = country.Buildings.Sum(b => b.Count * 50) + country.Upgrades.Sum(u => u.Progress > 0 ? 0 : 100) + country.Population + country.Units.Sum(u => u.UnitData.PointValue * u.Count);
            }

            //csaták törlése
            _dbContext.AttackingUnits.RemoveRange(_dbContext.AttackingUnits);
            _dbContext.Battles.RemoveRange(_dbContext.Battles);
            _dbContext.Explorations.RemoveRange(_dbContext.Explorations);
            _dbContext.Round.SingleOrDefault().RoundNumber++;
           

            await _dbContext.SaveChangesAsync();

            

            //Klienseken frissítés
            await _roundHubContext.Clients.All.RefreshInfo();

        }

        public async Task<CountryRoundDTO> GetCountryRound(int countryId)
        {
            var rankList = await _dataService.GetPlayerRanks();
            rankList.SingleOrDefault(r => r.CountryID == countryId);
            int rank = rankList.IndexOf(rankList.SingleOrDefault(r => r.CountryID == countryId)) + 1;
            return new CountryRoundDTO() { Rank = rank, Round = _dbContext.Round.SingleOrDefault().RoundNumber };
        }
    }
}

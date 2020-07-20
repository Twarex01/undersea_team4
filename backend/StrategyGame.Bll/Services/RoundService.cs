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

        public static int Round { get; set; } = 0;

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
            _dbContext.SaveChanges();
        }

        private void GenerateCoralIncome(Country country)
        {
            var corals = country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Coral.ID);
            corals.Amount += (int)Math.Truncate(corals.ProductionBase * corals.ProductionMultiplier);
            _dbContext.SaveChanges();
        }

        private void PaySoldiers(Country country)
        {

            foreach (var unit in country.Units)
            {
                var resource = country.Resources.Where(c => c.ResourceDataID == unit.UnitData.SalaryUnitID).FirstOrDefault();
                var resourcesLost = unit.UnitData.Salary * unit.Count;

                if (resource.Amount - resourcesLost >= 0)
                    resource.Amount -= resourcesLost;  //TESZTELNI!! a FoD miatt null pointer exception veszély
                else
                    resource.Amount = 0;
            }
            _dbContext.SaveChanges();

        }

        private void FeedSoldiers(Country country)
        {

            foreach (var unit in country.Units)
            {
                var resource = country.Resources.Where(c => c.ResourceDataID == unit.UnitData.ConsumptionUnitID).FirstOrDefault();
                var resourcesEaten = unit.UnitData.Consumption * unit.Count;

                if (resource.Amount - resourcesEaten >= 0)
                    resource.Amount -= resourcesEaten;  //TESZTELNI!! a FoD miatt null pointer exception veszély
                else
                    resource.Amount = 0;
            }
            _dbContext.SaveChanges();

        }



        private void ProceedWithUpgrade(Country country)
        {
            var currentlyUpgrading = country.Upgrades.Where(u => u.Progress > 0).SingleOrDefault(); //elvileg nem lehet 1-nél több eredmény
            if (currentlyUpgrading == null) return;
            currentlyUpgrading.Progress--;
            if (currentlyUpgrading.Progress == 0) currentlyUpgrading.UpgradeData.ApplyEffects(country);
            _dbContext.SaveChanges();

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
                _dbContext.SaveChanges();
            }
        }
        public async Task SimulateRound()
        {

            var countryList = _dbContext.Countries
                .Include(c => c.Buildings).ThenInclude(b => b.BuildingData)
                .Include(c => c.Upgrades).ThenInclude(u => u.UpgradeData)
                .Include(c => c.Units).ThenInclude(u => u.UnitData)
                .Include(c => c.Resources).ThenInclude(r => r.ResourceData)
                .ToList();

            // változások az egyes országokban
            foreach (var country in countryList)
            {
                GeneratePearlIncome(country);
                GenerateCoralIncome(country);
                PaySoldiers(country);
                FeedSoldiers(country);
                ProceedWithUpgrade(country);
                ProceedWithBuilding(country);

            }

            //Harc
            foreach (var battleID in _dbContext.Battles.Select(b => b.ID))
            {
                await _battleService.CommenceBattle(battleID);
            }

            //pont számolás
            foreach (var country in countryList)
            {
                country.Score = country.Buildings.Sum(b => b.Progress > 0 ? 0 : b.Count * 50) + country.Upgrades.Sum(u => u.Progress > 0 ? 0 : 100) + country.Population + country.Units.Sum(u => u.UnitData.PointValue);
            }
            _dbContext.SaveChanges();

            Round++;

            //Klienseken frissítés
            await _roundHubContext.Clients.All.RefreshInfo();

        }

        public CountryRoundDTO GetCountryRound(int countryId)
        {
            var rankList = _dataService.GetPlayerRanks();
            rankList.SingleOrDefault(r => r.CountryID == countryId);
            int rank = rankList.IndexOf(rankList.SingleOrDefault(r => r.CountryID == countryId)) + 1;
            return new CountryRoundDTO() { Rank = rank, Round = Round };
        }
    }
}

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StrategyGame.Bll.DTO;
using StrategyGame.Dal;
using StrategyGame.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
    public class RoundService : IRoundService
    {

        private AppDbContext _dbContext;
        private UserManager<User> _userManager;
        private Random soldierMoraleGenerator = new Random();
        private IBattleService _battleService;
        private IDataService _dataService;

        public RoundService(AppDbContext dbContext, UserManager<User> userManager , IBattleService battleService, IDataService dataService)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _battleService = battleService;
            _dataService = dataService;
        }

        private void GeneratePearlIncome(Country country)
        {
            var pearls = country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Pearl.ID);
            pearls.Amount += (int)Math.Truncate( pearls.ProductionBase * pearls.ProductionMultiplier);
        }

        private void GenerateCoralIncome(Country country)
        {
            var corals = country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Coral.ID);
            corals.Amount += (int)Math.Truncate(corals.ProductionBase * corals.ProductionMultiplier);
        }

        private void PaySoldiers(Country country)
        {
            
            foreach(var unit in country.Units)
            {
                country.Resources.Where(c => c.ResourceDataID == unit.UnitData.SalaryUnitID).FirstOrDefault().Amount -= unit.UnitData.Salary;  //TESZTELNI!! a FoD miatt null pointer exception veszély
            }
            
        }

        private void ProceedWithUpgrade(Country country)
        {
            var currentlyUpgrading = country.Upgrades.Where(u => u.Progress > 0).SingleOrDefault(); //elvileg nem lehet 1-nél több eredmény
            currentlyUpgrading.Progress--;
            if (currentlyUpgrading.Progress == 0) currentlyUpgrading.UpgradeData.ApplyEffects(country);
            
          
        }
        private void ProceedWithBuilding(Country country)
        {
            var currentlyBuilding = country.Buildings.Where(u => u.Progress > 0).SingleOrDefault(); //elvileg nem lehet 1-nél több eredmény
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
            foreach( var country in countryList)
            {
                GeneratePearlIncome(country);
                GenerateCoralIncome(country);
                PaySoldiers(country);
                ProceedWithUpgrade(country);
                ProceedWithBuilding(country);

            }

            //Harc
            foreach (var battleID in _dbContext.Battles.Select(b=> b.ID))
            {
                await _battleService.CommenceBattle(battleID);
            }

            //pont számolás
            foreach(var country in countryList)
            {
                country.Score = country.Buildings.Sum(b => b.Progress > 0 ? 0 : b.Count * 50) + country.Upgrades.Sum(u => u.Progress>0 ? 0 : 100) + country.Population + country.Units.Sum(u => u.UnitData.PointValue);
            }


        }

        public CountryRoundDTO GetCountryRound(int countryId)
        {
            var rankList = _dataService.GetPlayerRanks();
            rankList.SingleOrDefault(r => r.CountryID == countryId);
            int rank = rankList.IndexOf(rankList.SingleOrDefault(r => r.CountryID == countryId))+1;
            return new CountryRoundDTO() { Rank = rank, Round = 0 }; //actual round pls
        }
    }
}

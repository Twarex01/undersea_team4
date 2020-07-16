using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StrategyGame.Bll.Hubs;
using StrategyGame.Bll.DTO;
using StrategyGame.Dal;
using StrategyGame.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using StrategyGame.Bll.Services.Hubs;
using Hangfire;

namespace StrategyGame.Bll.Services
{
    public class RoundService : IRoundService
    {

        public int Round { get; set; }

        private AppDbContext _dbContext;
        private UserManager<User> _userManager;
        private Random soldierMoraleGenerator = new Random();
        private IBattleService _battleService;
        private IHubContext<RoundHub, IRoundHubClient> _roundHubContext;
        private IDataService _dataService;
        private IBackgroundJobClient _backgroundJobs;

        public RoundService(AppDbContext dbContext, UserManager<User> userManager , 
            IBattleService battleService, IDataService dataService, IHubContext<RoundHub, 
                IRoundHubClient> roundHubContext)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _battleService = battleService;
            _roundHubContext = roundHubContext;
            _dataService = dataService;
            _backgroundJobs = backgroundJobs;
        }

        private void GeneratePearlIncome(Country country)
        {
            var pearls = country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Pearl.ID);
            pearls.Amount += (int)Math.Truncate( pearls.ProductionBase * pearls.ProductionMultiplier);
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
            
            foreach(var unit in country.Units)
            {
                country.Resources.Where(c => c.ResourceDataID == unit.UnitData.SalaryUnitID).FirstOrDefault().Amount -= unit.UnitData.Salary;  //TESZTELNI!! a FoD miatt null pointer exception veszély
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
            _dbContext.SaveChanges();

            Round++;

            //Klienseken frissítés
            _roundHubContext.Clients.All.RefreshInfo();  

        }

        public CountryRoundDTO GetCountryRound(int countryId)
        {
            var rankList = _dataService.GetPlayerRanks();
            rankList.SingleOrDefault(r => r.CountryID == countryId);
            int rank = rankList.IndexOf(rankList.SingleOrDefault(r => r.CountryID == countryId))+1;
            return new CountryRoundDTO() { Rank = rank, Round = Round }; //actual round pls
        }
    }
}

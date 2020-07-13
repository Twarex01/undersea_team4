using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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
    class RoundService : IRoundService
    {

        private AppDbContext _dbContext;
        private UserManager<User> _userManager;
        private Random soldierMoraleGenerator = new Random();

        public RoundService(AppDbContext dbContext, UserManager<User> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
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
            if (currentlyUpgrading.Progress == 0) currentlyUpgrading.ApplyEffects();
            
          
        }
        private void ProceedWithBuilding(Country country)
        {
            var currentlyBuilding = country.Buildings.Where(u => u.Progress > 0).SingleOrDefault(); //elvileg nem lehet 1-nél több eredmény
            currentlyBuilding.Progress--;
            if (currentlyBuilding.Progress == 0) currentlyBuilding.ApplyEffect();
        }
        public async Task SimulateRound() 
        {
            
            var countryList = await _dbContext.Countries
                .Include(c => c.Buildings).ThenInclude(b => b.BuildingData)
                .Include(c => c.Upgrades).ThenInclude(u => u.UpgradeData)
                .Include(c => c.Units).ThenInclude(u => u.UnitData)
                .Include(c => c.Resources).ThenInclude(r => r.ResourceData)
                .ToListAsync();

            var battles = await _dbContext.Battles
                .Include(b=> b.AttackingCountry)
                .Include(b => b.DefendingCountry)
                .Include(b => b.AttackingUnits).ThenInclude(u=> u.UnitData)
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
            


        }
    }
}

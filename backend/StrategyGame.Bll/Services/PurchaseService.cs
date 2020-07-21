using Microsoft.EntityFrameworkCore;
using StrategyGame.Bll.DTO;
using StrategyGame.Dal;
using StrategyGame.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
    public class PurchaseService : IPurchaseService
    {


        private readonly AppDbContext _appDbContext = null;

        public PurchaseService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<int> PurchaseCountryBuildingAsync(int countryId, int buildingId) //TODO
        {
           
            if (await _appDbContext.Buildings.Where(b => b.CoutryID == countryId).AnyAsync(b => b.Progress > 0)) throw new Exception("Already building something");   //már épül valami

            Country country = await _appDbContext.Countries.Where(c => c.ID == countryId).Include(c => c.Resources).ThenInclude(r => r.ResourceData).SingleOrDefaultAsync();
            if (country == null) throw new Exception("Country not found"); //nincs ilyen ID-jű country
            
            BuildingData toBuild = await _appDbContext.BuildingData.Where(b => b.ID == buildingId).SingleOrDefaultAsync();
            if (toBuild == null) throw new Exception("Building not found"); //nincs iylen ID-jű épület

            foreach(var price in toBuild.Prices)
            {
                var resource = country.Resources.SingleOrDefault(r => r.ResourceDataID == price.PriceUnitID);
                if (resource.Amount < price.Amount ) throw new Exception("Not enough resources");  // nincs elég erőforrás
                resource.Amount = Math.Max(0, resource.Amount - price.Amount);

            }
            
            Building alreadyPresent = await _appDbContext.Buildings.Where(b => b.CoutryID == country.ID && b.BuildingDataID == toBuild.ID).SingleOrDefaultAsync();
            if (alreadyPresent != null)
            {
                alreadyPresent.Progress = toBuild.BuildTime;
            }
            else
            {
                Building newBuilding = new Building() { BuildingDataID = toBuild.ID, Count = 0, Progress = toBuild.BuildTime, CoutryID = country.ID, };
                _appDbContext.Buildings.Add(newBuilding);
            }


            await _appDbContext.SaveChangesAsync();
            return 0;
        }

        public async Task<int> PurchaseCountryUnitsAsync(int countryId, List<UnitDTO> army)
        {
            Country country = await _appDbContext.Countries
                .Include(c => c.Resources).ThenInclude(r => r.ResourceData)
                .Include(c => c.Units)
                .SingleOrDefaultAsync(c => c.ID == countryId);

            var totalCost = new List<Resource>();
            var unitsToBuy = new List<Unit>();
            foreach (var unit in army)
            {
                var unitdata = _appDbContext.UnitData.Single(u => u.ID == unit.UnitTypeID);
                var existingCost = totalCost.SingleOrDefault(c => c.ResourceDataID == unitdata.PriceUnitID);
                if (existingCost == null) totalCost.Add(new Resource { Amount = unitdata.Price * unit.Count, ResourceDataID = (int)unitdata.PriceUnitID });
                else existingCost.Amount += unitdata.Price * unit.Count;
                unitsToBuy.Add(new Unit() { UnitDataID = unit.UnitTypeID, Count = unit.Count, CountryID = countryId, });
            }
            foreach (var resource in country.Resources)
            {
                var cost = totalCost.SingleOrDefault(r => r.ResourceDataID == resource.ResourceDataID);
                if (cost == null) continue;
                if (resource.Amount < cost.Amount) throw new Exception("Not enough money");
            }

            int numberOfBoughtUnits = 0;
            foreach (var unit in unitsToBuy)
            {
                numberOfBoughtUnits += unit.Count;
            }
            var numberOfExistingUnits = country.Units.Sum(u => u.Count);
            if (numberOfBoughtUnits + numberOfExistingUnits > country.ArmyCapacity) throw new Exception("Not enough army capacity");

            foreach (var unit in unitsToBuy)
            {
                var existingUnits = country.Units.SingleOrDefault(u => u.UnitDataID == unit.UnitDataID);
                if (existingUnits == null) country.Units.Add(unit);
                else existingUnits.Count += unit.Count;
            }

            foreach (var cost in totalCost)
            {
                country.Resources.SingleOrDefault(r => r.ResourceDataID == cost.ResourceDataID).Amount -= cost.Amount;
            }
            _appDbContext.SaveChanges();
            return 0;

        }

        public async Task<int> PurchaseCountryUpgradeAsync(int countryId, int upgradeId)
        {
            if (await _appDbContext.Upgrades.Where(b => b.CoutryID == countryId).AnyAsync(b => b.Progress > 0)) throw new Exception("Already upgrading something"); //már fejlődik valami
            Country country = await _appDbContext.Countries.Include(c => c.Upgrades).SingleOrDefaultAsync(c => c.ID == countryId);
            if (country == null) throw new Exception("Country not found"); //nincs ilyen ID-jű country
            var toUpgrade = await _appDbContext.UpgradeData.Where(u => u.ID == upgradeId).SingleOrDefaultAsync();
            if (toUpgrade == null) throw new Exception("Upgrade not found"); //nincs ilyen ID - jű upgrade
            var existingUpgrade = country.Upgrades.FirstOrDefault(u => u.UpgradeDataID == upgradeId);
            if (existingUpgrade != null) throw new Exception("Upgrade already exists"); //van már ilyen upgrade

            var newUpgrade = new Upgrade() { Progress = toUpgrade.UpgradeTime, UpgradeDataID = toUpgrade.ID, CoutryID = country.ID };

            _appDbContext.Upgrades.Add(newUpgrade);
            await _appDbContext.SaveChangesAsync();
            return 0;
        }
    }
}

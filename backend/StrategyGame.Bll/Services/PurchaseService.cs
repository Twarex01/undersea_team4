using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using StrategyGame.Bll.DTO;
using StrategyGame.Bll.DTO.Validators;
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

        public async Task PurchaseCountryBuildingAsync(int countryId, int buildingId) //TODO
        {

            if (await _appDbContext.Buildings.Where(b => b.CoutryID == countryId).AnyAsync(b => b.Progress > 0))
            {
                throw new HttpResponseException { Status = 400, Value = "Already building something" };   //már épül valami
            }

            Country country = await _appDbContext.Countries.Include(c => c.Resources).ThenInclude(r => r.ResourceData).SingleOrDefaultAsync(c => c.ID == countryId);
            if (country == null)
            {
                throw new HttpResponseException { Status = 400, Value = "Nincs ilyen ország" }; //nincs ilyen ID-jű country
            }

            BuildingData toBuild = await _appDbContext.BuildingData.Include(b=> b.Prices).ThenInclude(p=> p.PriceUnit).SingleOrDefaultAsync(b => b.ID == buildingId);
            if (toBuild == null)
            {
                throw new HttpResponseException { Status = 400, Value = "Nincs ilyen épület" }; //nincs iylen ID-jű épület
            }

            foreach (var price in toBuild.Prices)
            {
                var resource = country.Resources.SingleOrDefault(r => r.ResourceDataID == price.PriceUnitID);
                if (resource.Amount < price.Amount)
                {
                    throw new HttpResponseException { Status = 400, Value = "Nincs elég erőforrásod" };  // nincs elég erőforrás
                }
                resource.Amount = Math.Max(0, resource.Amount - price.Amount);

            }
            
            Building alreadyPresent = await _appDbContext.Buildings.SingleOrDefaultAsync(b => b.CoutryID == country.ID && b.BuildingDataID == toBuild.ID);
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
            return;
        }

        public async Task PurchaseCountryUnitsAsync(int countryId, List<UnitDTO> army)
        {

            foreach (UnitDTO unit in army)
            {
                UnitDTOValidator unitValidator = new UnitDTOValidator();
                ValidationResult validatorResults = unitValidator.Validate(unit);

                if (!validatorResults.IsValid)
                {
                    foreach (var failure in validatorResults.Errors)
                    {
                        throw new HttpResponseException { Status = 400, Value = failure.ErrorMessage };
                    }
                }
            }

            Country country = await _appDbContext.Countries
                .Include(c => c.Resources).ThenInclude(r => r.ResourceData)
                .Include(c => c.Units)
                .SingleOrDefaultAsync(c => c.ID == countryId);
            var unitDatas = await _appDbContext.UnitData.ToListAsync();

            var totalCost = new List<Resource>();
            var unitsToBuy = new List<Unit>();
            foreach (var unit in army)
            {
                var unitdata = unitDatas.SingleOrDefault(u => u.ID == unit.UnitTypeID);
                var existingCost = totalCost.SingleOrDefault(c => c.ResourceDataID == unitdata.PriceUnitID);
                if (existingCost == null) totalCost.Add(new Resource { Amount = unitdata.Price * unit.UnitCount, ResourceDataID = (int)unitdata.PriceUnitID });
                else existingCost.Amount += unitdata.Price * unit.UnitCount;
                unitsToBuy.Add(new Unit() { UnitDataID = unit.UnitTypeID, Count = unit.UnitCount, CountryID = countryId, });
            }
            foreach (var resource in country.Resources)
            {
                var cost = totalCost.SingleOrDefault(r => r.ResourceDataID == resource.ResourceDataID);
                if (cost == null) continue;
                if (resource.Amount < cost.Amount)
                {
                    throw new HttpResponseException { Status = 400, Value = "Nincs elég pénzed" };
                }
            }

            int numberOfBoughtUnits = 0;
            foreach (var unit in unitsToBuy)
            {
                numberOfBoughtUnits += unit.Count;
            }
            var numberOfExistingUnits = country.Units.Sum(u => u.Count);
            if (numberOfBoughtUnits + numberOfExistingUnits > country.ArmyCapacity)
            {
                throw new HttpResponseException { Status = 400, Value = "Nincs elég helyed a katonáknak" };
            }

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
            await _appDbContext.SaveChangesAsync();
            return;

        }

        public async Task PurchaseCountryUpgradeAsync(int countryId, int upgradeId)
        {
            if (await _appDbContext.Upgrades.Where(b => b.CoutryID == countryId).AnyAsync(b => b.Progress > 0))
            {
                throw new HttpResponseException { Status = 400, Value = "Already upgrading something" }; //már fejlődik valami
            }

            Country country = await _appDbContext.Countries.Include(c => c.Upgrades).SingleOrDefaultAsync(c => c.ID == countryId);
            if (country == null)
            {
                throw new HttpResponseException { Status = 400, Value = "Nincs ilyen ország" }; //nincs ilyen ID-jű country
            }

            var toUpgrade = await _appDbContext.UpgradeData.Where(u => u.ID == upgradeId).SingleOrDefaultAsync();
            if (toUpgrade == null)
            {
                throw new HttpResponseException { Status = 400, Value = "Nincs ilyen fejlesztés" }; //nincs ilyen ID - jű upgrade
            }

            var existingUpgrade = country.Upgrades.FirstOrDefault(u => u.UpgradeDataID == upgradeId);
            if (existingUpgrade != null)
            {
                throw new HttpResponseException { Status = 400, Value = "Már van ilyen fejlesztésed" }; //van már ilyen upgrade
            }

            var newUpgrade = new Upgrade() { Progress = toUpgrade.UpgradeTime, UpgradeDataID = toUpgrade.ID, CoutryID = country.ID };

            _appDbContext.Upgrades.Add(newUpgrade);
            await _appDbContext.SaveChangesAsync();
            return;
        }
    }
}

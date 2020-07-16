using Microsoft.EntityFrameworkCore;
using StrategyGame.Bll.DTO;
using StrategyGame.Dal;
using StrategyGame.Model;
using StrategyGame.Model.BuildingTypes;
using StrategyGame.Model.UpgradeTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Runtime.CompilerServices;
using System.Text;
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
			if (await _appDbContext.Buildings.Where(b => b.CoutryID == countryId).AnyAsync(b => b.Progress > 0)) return 1; //már épül valami
			Country country = await _appDbContext.Countries.Where(c => c.ID == countryId).Include(c => c.Resources).ThenInclude(r => r.ResourceData).SingleOrDefaultAsync();
			if (country == null) return 2; //nincs ilyen ID-jű country
			BuildingData toBuild = await _appDbContext.BuildingData.Where(b => b.ID == buildingId).SingleOrDefaultAsync();
			if (toBuild == null) return 2; //nincs iylen ID-jű épület
			if (country.Resources.Where(r => r.ResourceDataID == toBuild.PriceUnitID).SingleOrDefault().Amount < toBuild.Price) return 3; // nincs elég erőforrás
			Building alreadyPresent = await _appDbContext.Buildings.Where(b => b.CoutryID == country.ID && b.BuildingDataID == toBuild.ID).SingleOrDefaultAsync();
			if (alreadyPresent != null)
			{
				alreadyPresent.Progress = toBuild.BuildTime;
				country.Resources.SingleOrDefault(r => r.ResourceDataID == toBuild.PriceUnitID).Amount -= toBuild.Price;
				await _appDbContext.SaveChangesAsync();
				return 0;
			}
			else
			{
				Building newBuilding = new Building() { BuildingDataID = toBuild.ID, Count = 0, Progress = toBuild.BuildTime, CoutryID = country.ID, };
				_appDbContext.Buildings.Add(newBuilding);
				country.Resources.SingleOrDefault(r => r.ResourceDataID == toBuild.PriceUnitID).Amount -= toBuild.Price;
				await _appDbContext.SaveChangesAsync();
				return 0;
			}
		}

		public async Task<int> PurchaseCountryUnitsAsync(int countryId, List<UnitDTO> army)
		{
			Country country = await _appDbContext.Countries
				.Include(c=> c.Resources).ThenInclude(r=> r.ResourceData)
				.Include(c=>c.Units)
				.SingleOrDefaultAsync(c => c.ID == countryId);

			var totalCost = new List<Resource>();
			var unitsToBuy = new List<Unit>();
			foreach (var unit in army)
            {
				var unitdata = _appDbContext.UnitData.Single(u => u.ID == unit.UnitTypeID);
				totalCost.Add(new Resource { Amount = unitdata.Price*unit.Count, ResourceDataID = (int)unitdata.PriceUnitID });
				unitsToBuy.Add(new Unit() { UnitDataID = unit.UnitTypeID, Count = unit.Count, CountryID = countryId, });
			}
			foreach(var resource in country.Resources)
            {
				var cost = totalCost.SingleOrDefault(r => r.ResourceDataID == resource.ResourceDataID);
				if (cost == null) continue;
				if (resource.Amount < cost.Amount) return 1; //nics elég pénz
            }
			
			foreach(var unit in unitsToBuy)
            {
				var existingUnits = country.Units.SingleOrDefault(u => u.UnitDataID == unit.UnitDataID);
				if (existingUnits == null) country.Units.Add(unit);
				else existingUnits.Count += unit.Count;
            }

			foreach(var cost in totalCost)
            {
				country.Resources.SingleOrDefault(r => r.ResourceDataID == cost.ResourceDataID).Amount -= cost.Amount;
            }
			_appDbContext.SaveChanges();
			return 0;
		
		}

		public async Task<int> PurchaseCountryUpgradeAsync(int countryId, int upgradeId)
		{
			if (await _appDbContext.Upgrades.Where(b => b.CoutryID == countryId).AnyAsync(b => b.Progress > 0)) return 1; //már fejlődik valami
			Country country = await _appDbContext.Countries.Where(c => c.ID == countryId).SingleOrDefaultAsync();
			if (country == null) return 2; //nincs ilyen ID-jű country
			var toUpgrade = await _appDbContext.UpgradeData.Where(u => u.ID == upgradeId).SingleOrDefaultAsync();
			if (toUpgrade == null) return 2; //nincs ilyen ID - jű upgrade
			var newUpgrade = new Upgrade() { Progress = toUpgrade.UpgradeTime, UpgradeDataID = toUpgrade.ID, CoutryID = country.ID };
			_appDbContext.Upgrades.Add(newUpgrade);
			await _appDbContext.SaveChangesAsync();
			return 0;
		}
	}
}

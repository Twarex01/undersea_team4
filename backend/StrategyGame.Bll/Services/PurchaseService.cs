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
				await _appDbContext.SaveChangesAsync();
				return 0;
			}
			else
			{
				Building newBuilding = new Building() { BuildingDataID = toBuild.ID, Count = 0, Progress = toBuild.BuildTime, CoutryID = country.ID, };
				_appDbContext.Buildings.Add(newBuilding);
				await _appDbContext.SaveChangesAsync();
				return 0;
			}
		}

		public async Task<int> PurchaseCountryUnitsAsync(int countryId, List<UnitDTO> army)
		{
			List<int> costs = new List<int>();
			var resourcesData = await _appDbContext.ResourceData.ToListAsync();
			var country = await _appDbContext.Countries.Where(c => c.ID == countryId).SingleOrDefaultAsync();
            foreach (var resourceData in resourcesData)
            {
				costs.Add(0);
            }
			foreach (var unitDto in army)
            {
				var unit = await _appDbContext.UnitData.Where(u => u.ID == unitDto.Id).SingleOrDefaultAsync();
				// 1 - Unit not found 
				if (unit == null) return await new Task<int>(() => 1);
				costs[(int)unit.PriceUnitID - 1] += unit.Price * unitDto.Count;
			}
			var costIndex = 0;
			var countryResource = country.Resources;
			foreach (var resourceData in resourcesData)
			{
				if (costs[costIndex] == 0) {
					costIndex++;
					continue; 
				}
				var resourceAmount = countryResource.Where(r => r.ID == resourceData.ID).SingleOrDefault().Amount;
				// 2 - not enough resources
				if (resourceAmount < costs[costIndex]) return await new Task<int>(() => 2);
			}
			costIndex = 0;
			foreach (var resourceData in resourcesData)
            {
				var resource = countryResource.Where(r => r.ID == resourceData.ID).SingleOrDefault();
				resource.Amount -= costs[costIndex++];
			}
			foreach (var unitDto in army)
            {
				var countryUnit = country.Units.Where(u => u.ID == unitDto.Id).SingleOrDefault();
				if (countryUnit == null)
				{
					countryUnit = new Unit
					{
						UnitDataID = unitDto.Id,
						Count = unitDto.Count,
						CountryID = countryId
					};
                }
                else
                {
					countryUnit.Count += unitDto.Count;

				}
            }
			await _appDbContext.SaveChangesAsync();
			throw new NotImplementedException("TODO");
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

using Microsoft.EntityFrameworkCore;
using StrategyGame.Bll.DTO;
using StrategyGame.Dal;
using StrategyGame.Model;
using StrategyGame.Model.BuildingTypes;
using StrategyGame.Model.UpgradeTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
	public class PurchaseService : IPurchaseService
	{
        private enum BuildingIds
        {
			FLOW_REGULATOR_ID = 1,
			REEF_FORT_ID
        }

		private enum UpgradesIds
        {
			ALCHEMY_ID = 1,
			CORALL_WALL_ID,
			MARTIAL_ARTS_ID,
			MUD_HARVESTER_ID,
			MUD_TRACTOR_ID,
			SONAR_CANNON_ID
		}

        private enum UnitsIds
        {
			ASSAULT_SEAL_ID = 1,
			BATTLE_SEAHORSE_ID,
			LASER_SHARK_ID
        }

        private readonly AppDbContext _appDbContext = null;

		public PurchaseService(AppDbContext appDbContext)
		{
			_appDbContext = appDbContext;
		}

		public async Task<int> PurchaseCountryBuildingAsync(int countryId, int buildingId) //TODO
		{
			var country = await _appDbContext.Countries.Where(c => c.ID == countryId).SingleOrDefaultAsync();
			var buildingInprogress = country.Buildings.Where(b => b.CoutryID == countryId).Any(u => u.Progress > 0);
			// 1 - There is a building inprogress
			if (buildingInprogress) return await new Task<int>(() => 1);

			var building = await _appDbContext.Buildings.Where(b => countryId == b.CoutryID && buildingId == b.BuildingDataID).SingleOrDefaultAsync();
			var buildingData = await _appDbContext.BuildingData.Where(data => data.ID == buildingId).SingleOrDefaultAsync();
			// 2 - Building not found
			if (buildingData == null) return await new Task<int>(() => 2);

			if (building == null)
			{
				switch ((BuildingIds)buildingId) {
					case BuildingIds.FLOW_REGULATOR_ID: // Áramlásirányító
						building = new FlowRegulator
						{
							Count = 0,
							BuildingDataID = buildingData.ID,
							CoutryID = countryId
						};
						break;
					case BuildingIds.REEF_FORT_ID: // Zátonyvár
						building = new ReefFort
						{
							Count = 0,
							BuildingDataID = buildingData.ID,
							CoutryID = countryId
						};
						break;
					default:
						break;
				} 
				
				await _appDbContext.Buildings.AddAsync(building);
				
			}

			// 3 - not enough resources
			if (country.Resources.Find(r => r.ID == buildingData.PriceUnitID).Amount < buildingData.Price) return await new Task<int>(() => 3);
			country.Resources.Find(r => r.ID == buildingData.PriceUnitID).Amount -= buildingData.Price;
			building.Progress = buildingData.BuildTime;
			
			await _appDbContext.SaveChangesAsync();

			// 0 - ok
			return await new Task<int>(() => 0);
		}

		public async Task<int> PurchaseCountryUnitsAsync(int countryId, List<UnitDTO> army)
		{
			List<int> costs = new List<int>();
			var resourcesData = await _appDbContext.ResourceData.ToListAsync();
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
			var countryResource = await _appDbContext.Resources.Where(r => r.CoutryID == countryId).ToListAsync();
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

			throw new NotImplementedException("TODO");
		}

		public async Task<int> PurchaseCountryUpgradeAsync(int countryId, int upgradeId)
		{
			var country = await _appDbContext.Countries.Where(c => c.ID == countryId).SingleOrDefaultAsync();
			var upgradeInprogress = country.Upgrades.Where(b => b.CoutryID == countryId).Any(u => u.Progress > 0);
			// 1 - There is a upgrade inprogress
			if (upgradeInprogress) return await new Task<int>(() => 1);

			var upgrade = await _appDbContext.Upgrades.Where(b => countryId == b.CoutryID && upgradeId == b.UpgradeDataID).SingleOrDefaultAsync();
			var upgradeData = await _appDbContext.UpgradeData.Where(data => data.ID == upgradeId).SingleOrDefaultAsync();
			// 2 - Upgrade not found
			if (upgradeData == null) return await new Task<int>(() => 2);

			if (upgrade == null) {
                switch ((UpgradesIds)upgradeId)
                {
					case UpgradesIds.ALCHEMY_ID:
						upgrade = new Alchemy
						{
							CoutryID = countryId,
							UpgradeDataID = upgradeId
						};
						break;
					case UpgradesIds.CORALL_WALL_ID:
						upgrade = new CoralWall
						{
							CoutryID = countryId,
							UpgradeDataID = upgradeId
						};
						break;
					case UpgradesIds.MARTIAL_ARTS_ID:
						upgrade = new MartialArts
						{
							CoutryID = countryId,
							UpgradeDataID = upgradeId
						};
						break;
					case UpgradesIds.MUD_HARVESTER_ID:
						upgrade = new MudHarvester
						{
							CoutryID = countryId,
							UpgradeDataID = upgradeId
						};
						break;
					case UpgradesIds.MUD_TRACTOR_ID:
						upgrade = new MudTractor
						{
							CoutryID = countryId,
							UpgradeDataID = upgradeId
						};
						break;
					case UpgradesIds.SONAR_CANNON_ID:
						upgrade = new SonarCannon
						{
							CoutryID = countryId,
							UpgradeDataID = upgradeId
						};
						break;
					default:
                        break;
                }

				await _appDbContext.Upgrades.AddAsync(upgrade);
            }

			upgrade.Progress = upgradeData.UpgradeTime;

			// 0 - ok
			return await new Task<int>(() => 0);
		}
	}
}

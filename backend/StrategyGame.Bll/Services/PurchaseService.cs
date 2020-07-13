using Microsoft.EntityFrameworkCore;
using StrategyGame.Bll.DTO;
using StrategyGame.Dal;
using StrategyGame.Model;
using StrategyGame.Model.BuildingTypes;
using System;
using System.Collections.Generic;
using System.Linq;
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
			var country = await _appDbContext.Countries.Where(c => c.ID == countryId).SingleOrDefaultAsync();
			var buildingInprogress = country.Buildings.Where(b => b.CoutryID == countryId).Any(u => u.Progress > 0);
			// There is a building inprogress
			if (buildingInprogress) return await new Task<int>(() => 1);

			var building = await _appDbContext.Buildings.Where(b => countryId == b.CoutryID && buildingId == b.BuildingDataID).SingleOrDefaultAsync();
			var buildingData = await _appDbContext.BuildingData.Where(data => data.ID == buildingId).SingleOrDefaultAsync();
			if (building == null)
			{
				// Building type not found
				if (buildingData == null ) return await new Task<int>(() => 2);
				switch (buildingId) {
					case 1: // Áramlásirányító
						building = new FlowRegulator
						{
							Count = 0,
							BuildingDataID = buildingData.ID,
							CoutryID = countryId
						};
						break;
					case 2: // Zátonyvár
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

			//not enough resources
			if (country.Resources.Find(r => r.ID == buildingData.PriceUnitID).Amount < buildingData.Price) return await new Task<int>(() => 3);
			country.Resources.Find(r => r.ID == buildingData.PriceUnitID).Amount -= buildingData.Price;
			building.Progress = 5; //todo: check it
			
			await _appDbContext.SaveChangesAsync();
			throw new NotImplementedException("TODO");
		}

		public async Task<int> PurchaseCountryUnitsAsync(int countryId, List<UnitDTO> army)
		{
			throw new NotImplementedException("TODO");
		}

		public async Task<int> PurchaseCountryUpgradeAsync(int countryId, int BuildingId)
		{
			throw new NotImplementedException("TODO");
		}
	}
}

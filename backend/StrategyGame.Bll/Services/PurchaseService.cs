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

		public async Task<bool> PurchaseCountryBuildingAsync(int countryId, int buildingId) //TODO
		{
			var building = await _appDbContext.Buildings.Where(b => countryId == b.CoutryID && buildingId == b.BuildingDataID).SingleOrDefaultAsync();
			var buildingData = await _appDbContext.BuildingData.Where(data => data.ID == buildingId).SingleOrDefaultAsync();
			if (building == null)
			{
				if (buildingData == null ) return await new Task<bool>(() => false);
				switch (buildingId) {
					case 1: // Áramlásirányító
						building = new FlowRegulator
						{
							Count = 0,
							//Progress = 5, buildingData.progress, Nem kell progress a BuildingData?
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
			var country = await _appDbContext.Countries.Where(c => c.ID == countryId).SingleOrDefaultAsync();
			if(country.Resources.Find(r => r.ID == buildingData.PriceUnitID).Amount < buildingData.Price) return await new Task<bool>(() => false);
			country.Resources.Find(r => r.ID == buildingData.PriceUnitID).Amount -= buildingData.Price;
			building.Progress = 5; //todo: check it
			
			await _appDbContext.SaveChangesAsync();
			throw new NotImplementedException("TODO");
		}

		public async Task<bool> PurchaseCountryUnitsAsync(int countryId, List<UnitDTO> army)
		{
			throw new NotImplementedException("TODO");
		}

		public async Task<bool> PurchaseCountryUpgradeAsync(int countryId, int BuildingId)
		{
			throw new NotImplementedException("TODO");
		}
	}
}

using StrategyGame.Bll.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
    public interface IDataService
    {
        public Task<CountryDetailsDTO> GetCountryDetailsAsync(int countryId);

        public Task<List<UnitDTO>> GetCountryUnitsAsync(int countryId);
        public Task<List<UpgradeDTO>> GetCountryUpgradesAsync(int countryId);
        public Task<List<BuildingDTO>> GetCountryBuildingsAsync(int countryId);
        public Task<List<ResourceDTO>> GetCountryResourcesAsync(int countryId);
        public Task<List<UnitDetailsDTO>> GetUnitDetailsAsync();
        public Task<List<UpgradeDetailsDTO>> GetUpgradeDetails();
        public Task<List<BuildingDetailsDTO>> GetBuildingDetailsAsync();
        public Task<List<RankDTO>> GetPlayerRanks();



    }
}

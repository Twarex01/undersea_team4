using StrategyGame.Bll.DTO;
using StrategyGame.Bll.DTO.Country;
using StrategyGame.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
    public interface IDataService
    {
        public CountryNameDTO QueryCountryName(int countryId);

        public Task<List<UnitDTO>> QueryCountryUnits(int countryId);

        public Task<CountryUpgradesDTO> QueryCountryUpgrades(int countryId);

        public int QueryCountryScore(int countryId);

        public List<UnitDetailsDTO> QueryUnitDetails();

        public List<ResourceDTO> QueryCountryResources(int countryId);

        public List<BuildingDTO> QueryCountryBuildings(int countryId);

        public Task<CountryResourcesDTO> QueryCountryResourcesDTO(int countryId);

        public List<PlayerDTO> QueryCountryRank();

        public RoundScoreDTO QueryRoundScore(int id);
    }
}

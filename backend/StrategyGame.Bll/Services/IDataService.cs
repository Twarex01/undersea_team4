using StrategyGame.Bll.DTO;
using StrategyGame.Bll.DTO.Country;
using StrategyGame.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Bll.Services
{
    interface IDataService
    {
        public CountryNameDTO QueryCountryName(int countryId);

        public CountryResourcesDTO QueryCountryResourcesDTO(int countryId);

        public List<UnitDTO> QueryCountryUnits(int countryId);

        public CountryUpgradesDTO QueryCountryUpgrades(int countryId);

        public int QueryCountryScore(int countryId);

        public List<ResourceDTO> QueryCountryResources(int countryId);

        public List<BuildingDTO> QueryCountryBuildings(int countryId);

        public List<PlayerDTO> QueryCountryRank();
    }
}

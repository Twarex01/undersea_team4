using StrategyGame.Bll.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
    public interface IPurchaseService
    {
        public Task<int> PurchaseCountryBuildingAsync(int countryId, int buildingId);
        public Task<int> PurchaseCountryUpgradeAsync(int countryId, int upgradeId);
        public Task<int> PurchaseCountryUnitsAsync(int countryId, List<UnitDTO> army);

    }
}

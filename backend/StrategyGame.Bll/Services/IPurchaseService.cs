using StrategyGame.Bll.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
    public interface IPurchaseService
    {
        public Task PurchaseCountryBuildingAsync(int countryId, int buildingId);
        public Task PurchaseCountryUpgradeAsync(int countryId, int upgradeId);
        public Task PurchaseCountryUnitsAsync(int countryId, List<UnitDTO> army);

    }
}

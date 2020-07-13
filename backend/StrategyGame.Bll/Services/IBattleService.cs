using StrategyGame.Bll.DTO;
using StrategyGame.Model;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
    public interface IBattleService
    {
        public Task<int> CountUnitsOfTypeNotAtHomeAsync(int countryId, int unitDataId);
 

        public Task<int> CountUnitsOfTypeAtHomeAsync(int countryId, int unitDataId);


        public Task<int> CountAttackPowerInBattleAsync(int battleId);

        public double CountDefensePowerInBattle(int countryId);

        public void SendUnitsOfTypeToAttack(int attackingCountryId, int defendingCountryId, int numberOfUnits, int unitDataId);

        public void SendAllTypesToAttack(BattleDTO battleDto);

        public void CommenceBattle(int battleId);

    }
}

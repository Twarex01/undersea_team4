using StrategyGame.Model;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
    public interface IBattleService
    {
        public Task<int> CountUnitsOfTypeNotAtHomeAsync(int countryId, int unitDataId);
 

        public Task<int> CountUnitsOfTypeAtHomeAsync(int countryId, int unitDataId);


        public Task<int> CountAttackPowerInBattleAsync(int battleId);

        public void CommenceBattle(int battleId);

    }
}

using StrategyGame.Model;

namespace StrategyGame.Bll.Services
{
    public interface IBattleService
    {
        public int CountUnitsOfTypeAttacking(int countryId, int unitDataId);

        public int CountUnitsOfTypeDefending(int countryId, int unitDataId);
    }
}

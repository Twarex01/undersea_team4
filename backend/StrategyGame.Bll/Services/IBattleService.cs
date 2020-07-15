using StrategyGame.Bll.DTO;
using StrategyGame.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
    public interface IBattleService
    {

        public Task SendAllTypesToAttack(BattleDTO battleDto);

        public Task CommenceBattle(int battleId);

        public Task<List<Battle>> GetCountryBattles(int countryId);

    }
}

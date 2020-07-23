using StrategyGame.Bll.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
    public interface IBattleService
    {

        public Task SendAllTypesToAttack(BattleDTO battleDto);

        public Task CommenceBattle(int battleId);

        public Task<List<BattleDetailsDTO>> GetCountryBattles(int countryId);

        public Task SimulateExploration(int explorationId);

        public Task SendExplorersToCountry(SendExplorationDTO explorationDTO);

        public Task<List<ExplorationInfoDTO>> GetExplorationInfo(int countryId);

        public Task<List<ExplorationDetailsDTO>> GetCountryExplorations(int countryId);

    }
}

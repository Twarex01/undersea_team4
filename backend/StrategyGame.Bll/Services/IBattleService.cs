using StrategyGame.Bll.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
	public interface IBattleService
	{

		public void SendAllTypesToAttack(BattleDTO battleDto);

		public void CommenceBattle(int battleId);

		public Task<List<BattleDetailsDTO>> GetCountryBattles(int countryId);

	}
}

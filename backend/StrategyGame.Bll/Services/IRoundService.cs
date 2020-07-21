using StrategyGame.Bll.DTO;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
    public interface IRoundService
    {

        public Task SimulateRound();

        public CountryRoundDTO GetCountryRound(int countryId);


    }
}

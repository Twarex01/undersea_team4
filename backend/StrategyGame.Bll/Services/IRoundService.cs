using StrategyGame.Bll.DTO;
using StrategyGame.Dal;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
    public interface IRoundService
    {

        public Task SimulateRound();

        public CountryRoundDTO GetCountryRound(int countryId);
        

    }
}

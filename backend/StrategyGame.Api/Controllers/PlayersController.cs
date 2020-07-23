using Microsoft.AspNetCore.Mvc;
using StrategyGame.Bll.DTO;
using StrategyGame.Bll.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StrategyGame.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {

        private IDataService _dataService;
        public PlayersController(IDataService dataService)
        {
            _dataService = dataService;
        }

        //GEt api/players
        [HttpGet]
        public async Task<List<RankDTO>> PlayerList()
        {
            return await _dataService.GetPlayerRanks();
        }

    }
}

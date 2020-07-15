using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrategyGame.Bll.DTO;
using StrategyGame.Bll.Services;

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
        public List<RankDTO> PlayerList()
        {
            return _dataService.QueryCountryRank();
        }

    }
}

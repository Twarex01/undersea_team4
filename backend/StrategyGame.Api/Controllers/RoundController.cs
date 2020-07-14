using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrategyGame.Bll.DTO;
using StrategyGame.Bll.Services;

namespace StrategyGame.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoundController : ControllerBase
    {

        private IDataService _dataService;
        public RoundController(IDataService dataService)
        {
            _dataService = dataService;

        }

        //GET api/round
        [HttpGet("{id}")]
        public RoundScoreDTO Points(int id)
        {
            return _dataService.QueryRoundScore(id);
        }

        //PUT api/round
        [HttpPost]
        [Authorize]
        public IActionResult NextRound()
        {
            return Ok();
        }
    }
}

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
    public class RoundController : ControllerBase
    {



        //GET api/round
        [HttpGet]
        public RoundScoreDTO Points()
        {
            throw new NotImplementedException("TODO");
        }

        //PUT api/round
        [HttpPost]
        public IActionResult NextRound()
        {
            throw new NotImplementedException("TODO");
        }
    }
}

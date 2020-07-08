using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StrategyGame.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Round : ControllerBase
    {
        //GET api/round
        [HttpGet]
        public IActionResult Points()
        {
            throw new Exception("TODO");
        }

        //PUT api/round
        [HttpPost]
        public IActionResult NextRound()
        {
            throw new Exception("TODO");
        }



    }
}

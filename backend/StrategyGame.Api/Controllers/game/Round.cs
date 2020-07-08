using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StrategyGame.Api.Controllers.game
{
    [Route("api/[controller]")]
    [ApiController]
    public class Round : ControllerBase
    {
        [HttpGet]
        public void Points() {
            throw new Exception("TODO");
        }

        [HttpPost]
        public void NextRound()
        {
            throw new Exception("TODO");
        }



    }
}

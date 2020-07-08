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
    public class Upgrades : ControllerBase
    {
        //GET api/upgrades
        [HttpGet]
        public IActionResult UpgradesData()
        {
            throw new Exception("TODO");
        }

    }
}

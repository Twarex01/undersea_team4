using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using StrategyGame.Api.Controllers.DTO;

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
            //return Ok(mapper.Map<UpgradeResultDTO>(upgradeMOdel))
            throw new Exception("TODO");
        }

    }
}

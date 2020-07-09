using System;
using System.Collections.Generic;
using System.ComponentModel.Design.Serialization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrategyGame.Bll.DTO;

namespace StrategyGame.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BattleController : ControllerBase
    {
        // POST api/attack
        [HttpPost]
        [Authorize]
        [Route("attack")]
        public IActionResult Attack([FromBody] BattleDTO battleDTO)
        {
            throw new NotImplementedException("TODO");
        }
    }
}

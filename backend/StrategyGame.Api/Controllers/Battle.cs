using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StrategyGame.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Battle : ControllerBase
    {
        // POST api/attack
        [HttpPost]
        [Authorize]
        public IActionResult Attack() // params: (Támadólista: TámadóID, VédőId, Egységlista: ID, db) 
        {
            throw new Exception("TODO");
        }
    }
}

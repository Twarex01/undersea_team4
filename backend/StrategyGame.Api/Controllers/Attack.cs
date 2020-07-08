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
    public class Attack : ControllerBase
    {
        // POST api/attack
        [HttpPost]
        public IActionResult Battle() // params: (Támadólista: TámadóID, VédőId, Egységlista: ID, db) 
        {
            throw new Exception("TODO");
        }
    }
}

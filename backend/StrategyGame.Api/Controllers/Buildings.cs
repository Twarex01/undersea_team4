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
    public class Buildings : ControllerBase
    {
        // GET api/buildings
        [HttpGet]
        public IActionResult BuildingsData()
        {
            throw new Exception("TODO");
        }
    }
}

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
    public class Units : ControllerBase
    {
        //GET api/units
        [HttpGet]
        public IActionResult UnitsData()
        {
            throw new Exception("TODO");
        }
    }
}

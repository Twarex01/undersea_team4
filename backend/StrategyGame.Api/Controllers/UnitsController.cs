using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrategyGame.Bll.DTO;

namespace StrategyGame.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitsController : ControllerBase
    {
        //POST api/units
        [HttpPost]
        public List<UnitDetailsDTO> UnitsData([FromBody] int id)
        {
            throw new NotImplementedException("TODO");
        }
    }
}

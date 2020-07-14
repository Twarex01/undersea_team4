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
    public class BuildingsController : ControllerBase
    {
        // POST api/buildings
        [HttpPost]
        public List<BuildingDetailsDTO> BuildingsData([FromBody] int id)
        {
            throw new NotImplementedException("TODO");
        }
    }
}

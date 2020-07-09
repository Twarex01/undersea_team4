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
        // GET api/buildings
        [HttpGet]
        public List<BuildingDetailsDTO> BuildingsData()
        {
            throw new NotImplementedException("TODO");
        }
    }
}

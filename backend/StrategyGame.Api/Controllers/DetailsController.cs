using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.EnvironmentVariables;
using StrategyGame.Bll.DTO;
using StrategyGame.Bll.Services;

namespace StrategyGame.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailsController : ControllerBase
    {
        private IDataService _dataService;

        public DetailsController(IDataService dataService)
        {
            _dataService = dataService;
        }
        [HttpGet("Upgrades")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<List<UpgradeDetailsDTO>> GetAllUpgradeDetails()
        {
            return _dataService.GetUpgradeDetails();
        }

        [HttpGet("Buildings")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<List<BuildingDetailsDTO>>> GetAllBuildingDetails()
        {
            return await _dataService.GetBuildingDetailsAsync();
        }

        [HttpGet("Units")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<List<UnitDetailsDTO>>> GetAllUnitDetails()
        {
            return await _dataService.GetUnitDetailsAsync();
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrategyGame.Bll.DTO;
using StrategyGame.Bll.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        public async Task<ActionResult<List<UpgradeDetailsDTO>>> GetAllUpgradeDetails()
        {
            return Ok(await _dataService.GetUpgradeDetails());
        }

        [HttpGet("Buildings")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<List<BuildingDetailsDTO>>> GetAllBuildingDetails()
        {
            return Ok(await _dataService.GetBuildingDetailsAsync());
        }

        [HttpGet("Units")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<List<UnitDetailsDTO>>> GetAllUnitDetails()
        {
            return Ok(await _dataService.GetUnitDetailsAsync());
        }
    }
}

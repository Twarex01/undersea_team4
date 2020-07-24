using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrategyGame.Bll.DTO;
using StrategyGame.Bll.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StrategyGame.Api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {

        private IPurchaseService _purchaseService;

        private IDataService _dataService;

        private IUserService _userService;

        public CountryController(IDataService dataService, IPurchaseService purchaseService, IUserService userService)
        {
            _dataService = dataService;
            _purchaseService = purchaseService;
            _userService = userService;
        }

        // GET api/Country/Details
        [HttpGet("Details")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<CountryDetailsDTO>> GetCountryDeatils()
        {
            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            var details = await _dataService.GetCountryDetailsAsync(country.ID);
            return Ok(details);
        }

        // GET api/Country/Resources
        [HttpGet("Resources")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<ResourceDTO>>> GetCountryResources()
        {
            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            var resources = await _dataService.GetCountryResourcesAsync(country.ID);
            return Ok(resources);
        }

        // PUT api/Country/Buildings/1
        [HttpPut("Buildings/{buildingId}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public async Task<ActionResult> BuyBuilding(int buildingId)
        {

           var country = await _userService.GetCountryByUserID(User.Identity.Name);
           await _purchaseService.PurchaseCountryBuildingAsync(country.ID, buildingId);

            return Ok();
        }

        //GET api/Country/Upgrades
        [HttpGet("Upgrades")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<UpgradeDTO>>> GetCountryUpgrades()
        {

            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            var upgrades = await _dataService.GetCountryUpgradesAsync(country.ID);

            return Ok(upgrades);
        }

        //PUT api/Country/Upgrades/2
        [HttpPut("Upgrades/{upgradeId}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public async Task<ActionResult> BuyUpgradeAsync(int upgradeId)
        {
            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            await _purchaseService.PurchaseCountryUpgradeAsync(country.ID, upgradeId);

            return Ok();

        }

        //PUT api/Country/Units
        [HttpPut("Units")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public async Task<ActionResult> BuyUnitsAsync([FromBody] List<UnitDTO> army)
        {


             var country = await _userService.GetCountryByUserID(User.Identity.Name);
             await _purchaseService.PurchaseCountryUnitsAsync(country.ID, army);

            return Ok();

        }

        [HttpGet("Units")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public async Task<ActionResult<List<UnitDTO>>> GetCountryUnits()
        {
            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            return Ok(await _dataService.GetCountryUnitsAsync(country.ID));
        }

        [HttpGet("Buildings")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public async Task<ActionResult<List<BuildingDTO>>> GetCountryBuildings()
        {
            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            return Ok(await _dataService.GetCountryBuildingsAsync(country.ID));
        }

        [HttpGet("Report/{Round}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public async Task<ActionResult<FullReportDTO>> GetCountryReport(int Round)
        {
            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            return Ok(await _dataService.GetFullReport(country.ID,Round));
        }
    }
}

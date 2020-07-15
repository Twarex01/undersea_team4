using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrategyGame.Bll.DTO;
using StrategyGame.Bll.Services;

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
        public async Task<ActionResult<CountryDetailsDTO>> GetCountryDeatilsAsync()
        {
            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            var details =  await _dataService.GetCountryDetailsAsync(country.ID);
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
            var resources =  await _dataService.GetCountryResourcesAsync(country.ID);
            return Ok(resources);
        }

        // PUT api/Country/Buildings/1
        [HttpPut("Buildings/{buildingId}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        
        public async Task<ActionResult> BuyBuilding(int buildingId) 
        {
            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            var results = await _purchaseService.PurchaseCountryBuildingAsync(country.ID, buildingId);

            if (results == 0)
                return Ok();
            else
                return BadRequest();
        }

        //GET api/Country/Upgrades
        [HttpGet("Upgrades")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<UpgradeDTO>>> CountryUpgrades()
        {
            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            var upgrades = await _dataService.GetCountryUpgradesAsync(country.ID);
            return Ok(upgrades);
        }

        //PUT api/Country/Upgrades/2
        [HttpPut("Upgrades/{upgradeId}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        
        public async Task<ActionResult> BuyUpgradeAsync(int upgradeId)
        {
            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            var results = await _purchaseService.PurchaseCountryUpgradeAsync(country.ID, upgradeId);

            if (results == 0)
                return Ok();
            else
                return BadRequest();
        }

        //PUT api/Country/Units/3
        [HttpPut("Units")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        
        public async Task<ActionResult> BuyUnitsAsync([FromBody] List<UnitDTO> army) 
        {
            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            var results = await _purchaseService.PurchaseCountryUnitsAsync(country.ID, army);

            if (results == 0)
                return Ok();
            else
                return BadRequest();
        }
    }
}

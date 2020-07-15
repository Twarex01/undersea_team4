using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrategyGame.Bll.DTO;
using StrategyGame.Bll.DTO.Country;
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

        // GET api/Country/5
        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<CountryNameDTO> GetCountryNameAsync()
        {
            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            return _dataService.QueryCountryName(country.ID);
        }

        // GET api/Country/5/resources
        [HttpGet("resources")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<CountryResourcesDTO> GetCountryResources() 
        {
            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            return await _dataService.QueryCountryResourcesDTO(country.ID);
        }

        // PUT api/Country/5/buildings/1
        [HttpPut("buildings/{buildingId}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> BuyBuilding(int buildingId) 
        {
            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            var results = await _purchaseService.PurchaseCountryBuildingAsync(country.ID, buildingId);

            if (results == 0)
                return Ok();
            else
                return BadRequest();
        }

        //GET api/country/5/upgrades
        [HttpGet("upgrades")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<CountryUpgradesDTO> CountryUpgrades()
        {
            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            return await _dataService.QueryCountryUpgrades(country.ID);
        }

        //PUT api/country/5/upgrades/2
        [HttpPut("upgrades/{upgradeId}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> BuyUpgradeAsync(int upgradeId)
        {
            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            var results = _purchaseService.PurchaseCountryUpgradeAsync(country.ID, upgradeId).Result;

            if (results == 0)
                return Ok();
            else
                return BadRequest();
        }

        //PUT api/country/5/units/3
        [HttpPut("units")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> BuyUnitsAsync([FromBody] List<UnitDTO> army) // CountyBuyUnitDTO lehet nem kell
        {
            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            var results = _purchaseService.PurchaseCountryUnitsAsync(country.ID, army).Result;

            if (results == 0)
                return Ok();
            else
                return BadRequest();
        }
    }
}

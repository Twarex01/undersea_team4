﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public CountryController(IDataService dataService, IPurchaseService purchaseService)
        {
            _dataService = dataService;
            _purchaseService = purchaseService;
        }

        // GET api/Country/5
        [HttpGet("{id}")]
        public CountryNameDTO GetCountryName(int id)
        {
            return _dataService.QueryCountryName(id);
        }

        // GET api/Country/5/resources
        [HttpGet("{id}/resources")]
        public async Task<CountryResourcesDTO> GetCountryResources(int id) 
        {
           return await _dataService.QueryCountryResourcesDTO(id);
        }

        // PUT api/Country/5/buildings/1
        [HttpPut("{id}/buildings/{buildingId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> BuyBuilding( int id, int buildingId) 
        {
            
            var results = await _purchaseService.PurchaseCountryBuildingAsync(id, buildingId);

            if (results == 0)
                return Ok();
            else
                return BadRequest();
        }

        //GET api/country/5/upgrades
        [HttpGet("{id}/upgrades")]

        public async Task<CountryUpgradesDTO> CountryUpgrades(int id)
        {
            return await _dataService.QueryCountryUpgrades(id);
        }

        //PUT api/country/5/upgrades/2
        [HttpPut("{id}/upgrades/{upgradeId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult BuyUpgrade(int id, int upgradeId)
        {
            var results = _purchaseService.PurchaseCountryUpgradeAsync(id, upgradeId).Result;

            if (results == 0)
                return Ok();
            else
                return BadRequest();
        }

        //PUT api/country/5/units/3
        [HttpPut("{id}/units")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult BuyUnits(int id,[FromBody] List<UnitDTO> army) // CountyBuyUnitDTO lehet nem kell
        {
            var results = _purchaseService.PurchaseCountryUnitsAsync(id, army).Result;

            if (results == 0)
                return Ok();
            else
                return BadRequest();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        private DataService _dataService;
        public CountryController(DataService dataService)
        {
            _dataService = dataService;
        }

        // GET api/Country/5
        [HttpGet("{id}")]
        public CountryNameDTO GetCountryName(int id)
        {
            return _dataService.QueryCountryName(id);
        }

        // GET api/Country/5/resources
        [HttpGet("{id}/resources")]
        public CountryResourcesDTO GetCountryResources(int id) 
        {


            throw new NotImplementedException("TODO");
            //return _dataService.QueryCountryResources(id);
        }

        // PUT api/Country/5/buildings/1
        [HttpPut("{id}/buildings/{buildingId}")]
        public IActionResult BuyBuilding( int id, int buildingId) 
        {
            throw new NotImplementedException("TODO");
        }

        //GET api/country/5/upgrades
        [HttpGet("{id}/upgrades")]
        public CountryUpgradesDTO CountryUpgrades(int id)
        {
            return _dataService.QueryCountryUpgrades(id);
        }

        //PUT api/country/5/upgrades/2
        [HttpPut("{id}/upgrades/{upgradeId}")]
        public IActionResult BuyUpgrade(int id, int upgradeId)
        {
            throw new NotImplementedException("TODO");
        }

        //PUT api/country/5/units/3
        [HttpPut("{id}/units")]
        public IActionResult BuyUnits(int id,[FromBody] List<UnitDTO> army) // CountyBuyUnitDTO lehet nem kell
        {
            throw new NotImplementedException("TODO");
        }
    }
}

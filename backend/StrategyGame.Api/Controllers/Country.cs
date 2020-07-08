using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StrategyGame.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Country : ControllerBase
    {
        // GET api/Country/5/resources
        [HttpGet("{id}/resources")]
        public IActionResult GetCountryResources(int id) //retrun : IEnumerable<>
        {
            throw new Exception("TODO");
        }

        // PUT api/Country/5/buildings/1
        [HttpPut("{id}/buildings/{idB}")]
        public IActionResult BuyBuilding(int id, int buildingId) 
        {
            throw new Exception("TODO");
        }

        //GET api/country/5/upgrades
        [HttpGet("{id}/upgrades")
        public IActionResult CountryUpgrades(int id)
        {
            throw new Exception("TODO");
        }

        //PUT api/country/5/upgrades/2
        [HttpPut("{id}/upgrades/{idU}")]
        public IActionResult BuyUpgrade(int id, int upgradeId)
        {
            throw new Exception("TODO");
        }

        //PUT api/country/5/units/3
        [HttpPut("{id}/units/{idU}")]
        public IActionResult BuyUnits(int id, List<int> unitsCount, int unitId)
        {
            throw new Exception("TODO");
        }
    }
}

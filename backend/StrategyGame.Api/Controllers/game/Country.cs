using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StrategyGame.Api.Controllers.game
{
    [Route("api/[controller]")]
    [ApiController]
    public class Country : ControllerBase
    {

        // GET api/<Country>/5/resources
        [HttpGet("{id}/resources")]
        public void GetCountryResources(int id) //retrun : IEnumerable<>
        {
            throw new Exception("TODO");
        }

        [HttpPut("{id}/buildings/{idB}")]
        public void BuyBuilding(int id, int buildingId) 
        {
            throw new Exception("TODO");
        }

        [HttpGet("{id}/upgrades")]
        public void CountryUpgrades(int id)
        {
            throw new Exception("TODO");
        }

        [HttpPut("{id}/upgrades/{idU}")]
        public void BuyUpgrade(int id, int upgradeId)
        {
            throw new Exception("TODO");
        }


        [HttpPut("{id}/units/{idU}")]
        public void BuyUnits(int id, List<int> unitsCount, int unitId)
        {
            throw new Exception("TODO");
        }




    }
}

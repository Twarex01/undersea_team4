using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using StrategyGame.Bll.DTO;
using StrategyGame.Bll.Services;

namespace StrategyGame.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpgradesController : ControllerBase
    {

        private IDataService _dataService;
        public UpgradesController(IDataService dataService) 
        {
            _dataService = dataService;
        
        }

        //GET api/upgrades
        [HttpGet]
        public List<UpgradeDetailsDTO> UpgradesData()
        {


            //return Ok(mapper.Map<UpgradeResultDTO>(upgradeMOdel))
            throw new NotImplementedException("Ez végül nem kell elvileg");
        }

    }
}

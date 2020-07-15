using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public ActionResult<List<UpgradeDetailsDTO>> GetAllUpgradeDetails()
        {
            
        }
    }
}

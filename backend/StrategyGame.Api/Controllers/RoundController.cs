using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrategyGame.Bll.DTO;
using StrategyGame.Bll.Services;

namespace StrategyGame.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoundController : ControllerBase
    {

        private IDataService _dataService;
        private IUserService _userService;


        public RoundController(IDataService dataService, IUserService userService)
        {
            _dataService = dataService;
            _userService = userService;
        }

        //GET api/round
        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<RoundScoreDTO> PointsAsync()
        {
            var country = await _userService.GetCountryByUserID(User.Identity.Name);
            return _dataService.QueryRoundScore(country.ID);
        }

        //PUT api/round
        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public IActionResult NextRound()
        {
            return Ok();
        }
    }
}

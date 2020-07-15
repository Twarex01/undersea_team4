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

        private IRoundService _roundService;
        private IUserService _userService;


        public RoundController(IRoundService roundService, IUserService userService)
        {
            _roundService = roundService;
            _userService = userService;
        }

        //PUT api/round
        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult NextRound()
        {
            _roundService.SimulateRound();
            return Ok();
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrategyGame.Bll;
using StrategyGame.Bll.DTO;
using StrategyGame.Bll.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StrategyGame.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BattleController : ControllerBase
    {


        private IBattleService _battleService;
        private IUserService _userService;

        public BattleController(IBattleService battleService, IUserService userService)
        {
            _battleService = battleService;
            _userService = userService;
        }


        // POST api/Battle/Attack
        [HttpPost]
        [Authorize]
        [Route("Attack")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]

        public async Task<IActionResult> AttackAsync([FromBody] BattleDTO battleDTO)
        {
            var atkCountry = await _userService.GetCountryByUserID(User.Identity.Name);
            battleDTO.IdAtt = atkCountry.ID;

             _battleService.SendAllTypesToAttack(battleDTO);

            return Ok();
        }

        //GET api/Battle
        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<List<BattleDetailsDTO>>> GetCountryBattles()
        {
            var atkCountry = await _userService.GetCountryByUserID(User.Identity.Name);
            return Ok(await _battleService.GetCountryBattles(atkCountry.ID));

        }

        [HttpPost]
        [Authorize]
        [Route("Explore")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]

        public async Task<ActionResult> Explore([FromBody] SendExplorationDTO explorationDTO)
        {
            var atkCountry = await _userService.GetCountryByUserID(User.Identity.Name);
            explorationDTO.SenderCountryID = atkCountry.ID;
            _battleService.SendExplorersToCountry(explorationDTO);
            return Ok();
        }

        [HttpGet]
        [Authorize]
        [Route("Explorations")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<List<ExplorationInfoDTO>>> GetExplorationInfo()
        {
            var atkCountry = await _userService.GetCountryByUserID(User.Identity.Name);
            var result = _battleService.GetExplorationInfo(atkCountry.ID);
            return Ok(result);

        }
    }
}

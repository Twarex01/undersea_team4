using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrategyGame.Bll.DTO;
using StrategyGame.Bll.Services;

namespace StrategyGame.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BattleController : ControllerBase
    {


        private BattleService _battleService;

        public BattleController(BattleService battleService)
        {
            _battleService = battleService;
        }


        // POST api/attack
        [HttpPost]
        [Authorize]
        [Route("attack")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public IActionResult Attack([FromBody] BattleDTO battleDTO)
        {

            try
            {
                _battleService.SendAllTypesToAttack(battleDTO);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }

            return Ok();


        }
    }
}

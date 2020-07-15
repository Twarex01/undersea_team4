using System;
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
    public class BattleController : ControllerBase
    {


        private IBattleService _battleService;
        private IUserService _userService;

        public BattleController(IBattleService battleService, UserService userService)
        {
            _battleService = battleService;
            _userService = userService;
        }


        // POST api/attack
        [HttpPost]
        [Authorize]
        [Route("attack")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> AttackAsync([FromBody] BattleDTO battleDTO)
        {
            var atkCountry = await _userService.GetCountryByUserID(User.Identity.Name);
            battleDTO.IdAtt = atkCountry.ID;

            try
            {
                await _battleService.SendAllTypesToAttack(battleDTO);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }

            return Ok();


        }
    }
}

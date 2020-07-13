using System;
using Microsoft.AspNetCore.Authorization;
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
        public IActionResult Attack([FromBody] BattleDTO battleDTO)
        {



            _battleService.SendAllTypesToAttack(battleDTO);

            throw new Exception("TODO Hibakezelés");

        }
    }
}

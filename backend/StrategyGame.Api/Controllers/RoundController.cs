﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrategyGame.Bll.DTO;
using StrategyGame.Bll.Services;
using System;
using System.Net;
using System.Threading.Tasks;

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
        public async Task<ActionResult> NextRound()
        {
            await _roundService.SimulateRound();
            return Ok();
        }
        //GET api/round
        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<CountryRoundDTO>> GetCountryRound()
        {

            var Country = await _userService.GetCountryByUserID(User.Identity.Name);
            return Ok(await _roundService.GetCountryRound(Country.ID));
        }
    }
}

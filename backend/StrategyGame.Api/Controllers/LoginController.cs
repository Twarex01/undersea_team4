using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrategyGame.Api.Services;
using StrategyGame.Bll.DTO.common;
using StrategyGame.Bll.Services;

namespace StrategyGame.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private IUserService _userService;
        private IJwtService _JWTService;

        public LoginController(IUserService userService, IJwtService jWTService)
        {
            _userService = userService;
            _JWTService = jWTService;
        }

        [HttpPost]
        public async Task<IActionResult> PostLogin([FromBody] LoginDTO loginDTO)
        {
            
            var user = await _userService.AuthenticateUser(loginDTO);
            if (user==null) return BadRequest("nem megfelelő felhsználó név vagy jelszó");
            string token = _JWTService.GenerateSecurityToken(user);
            return Ok(token);
        }
    }
}

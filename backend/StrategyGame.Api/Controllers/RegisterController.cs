using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StrategyGame.Bll.DTO.common;
using StrategyGame.Model;

namespace StrategyGame.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private UserManager<User> _userManager;

        public RegisterController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> PostRegister([FromBody] RegisterDTO registerDTO)
        {
            User user = new User() { UserName = registerDTO.UserName };
            var result = await _userManager.CreateAsync(user, registerDTO.Password);
            if (result.Succeeded) return Ok();
            else return BadRequest();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StrategyGame.Bll.DTO.common;
using StrategyGame.Model;
using StrategyGame.Bll.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace StrategyGame.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {

        private IUserService userService;

        public RegisterController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> PostRegister([FromBody] RegisterDTO registerDTO)  
        {
            if (registerDTO.Password != registerDTO.PasswordConfirmation) return BadRequest("A megadott jelszavak nem egyeznek!");
            var result = await userService.RegisterUserAsync(registerDTO);
            if (result.Succeeded) return Ok();
            else return BadRequest(result.Errors.First());
            
            
            
        }
    }
}

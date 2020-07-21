using Microsoft.AspNetCore.Mvc;
using StrategyGame.Bll.DTO.common;
using StrategyGame.Bll.Services;
using System.Linq;
using System.Threading.Tasks;

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
			else return BadRequest(result.Errors.First().Description);



		}
	}
}

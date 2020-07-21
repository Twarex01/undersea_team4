using Microsoft.AspNetCore.Identity;
using StrategyGame.Bll.DTO.common;
using StrategyGame.Model;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
	public interface IUserService
	{
		public Task<IdentityResult> RegisterUserAsync(RegisterDTO registerDTO);

		public Task<User> AuthenticateUser(LoginDTO loginDTO);

		public Task<Country> GetCountryByUserID(string userID);
	}
}

using Microsoft.AspNetCore.Identity;
using StrategyGame.Bll.DTO.common;
using StrategyGame.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
    public class UserService : IUserService
    {
        private UserManager<User> _userManager;

        public UserService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IdentityResult> RegisterUserAsync(RegisterDTO registerDTO)
        {
            
            Country country = new Country(registerDTO.CountryName);
            User user = new User() { UserName = registerDTO.UserName, Country = country };
            country.User = user;

            var result = await _userManager.CreateAsync(user, registerDTO.Password);
            
            return result;
        }
    }
}

using Microsoft.AspNetCore.Identity;
using StrategyGame.Bll.DTO.common;
using StrategyGame.Dal;
using StrategyGame.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
    public class UserService : IUserService
    {
        private UserManager<User> _userManager;
        private AppDbContext _dbContext;

        public UserService(UserManager<User> userManager, AppDbContext dbContext)
        {
            _userManager = userManager;
            _dbContext = dbContext;
        }

        public async Task<User> AuthenticateUser(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByNameAsync(loginDTO.UserName);
            if (user == null) return null;
            if (await _userManager.CheckPasswordAsync(user, loginDTO.Password)) return user;
            else return null;
        }

        public async Task<IdentityResult> RegisterUserAsync(RegisterDTO registerDTO)
        {
            var xd = new IdentityResult();
            if (_dbContext.Countries.Any(c => c.Name == registerDTO.CountryName)) {
                var fail = new IdentityResult();
                fail.Errors.Append(new IdentityError() { Description = "Már van ilyen nevű ország" });
            }
            
            Country country = new Country() { Name = registerDTO.CountryName};
            User user = new User() { UserName = registerDTO.UserName, Country = country };
            country.User = user;

            var result = await _userManager.CreateAsync(user, registerDTO.Password);
            
            return result;
        }
    }
}

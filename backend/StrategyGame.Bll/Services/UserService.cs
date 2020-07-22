using FluentValidation.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StrategyGame.Bll.DTO.common;
using StrategyGame.Bll.Services.Validators;
using StrategyGame.Dal;
using StrategyGame.Model;
using System.Collections.Generic;
using System.Linq;
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
            if (_dbContext.Countries.Any(c => c.Name == registerDTO.CountryName))
            {
                throw new HttpResponseException() { Status = StatusCodes.Status400BadRequest, Value = "Már van ilyen nevű ország" };
            }

            var countries = _dbContext.Countries.ToList();

            RegisterValidator userValidator = new RegisterValidator(countries);
            ValidationResult validatorResults = userValidator.Validate(registerDTO);

            if (!validatorResults.IsValid)
            {
                foreach (var failure in validatorResults.Errors)
                {
                    throw new HttpResponseException { Status = 400, Value = failure.ErrorMessage };
                }
            }

            Country country = new Country()
            {
                Name = registerDTO.CountryName,
                Resources = new List<Resource>
                {
                    new Resource { ResourceDataID = ResourceData.Coral.ID, Amount=0, ProductionBase=ResourceData.BaseCoralProduction },
                    new Resource { ResourceDataID = ResourceData.Pearl.ID, Amount=0, ProductionBase=ResourceData.BasePopulation*ResourceData.TaxAmount, },
                    new Resource { ResourceDataID = ResourceData.Stone.ID, Amount=0, ProductionBase = 0}
                },
                Buildings = new List<Building>(),
                Upgrades = new List<Upgrade>(),
                Population = ResourceData.BasePopulation,
                ArmyCapacity = 100


            };
            User user = new User() { UserName = registerDTO.UserName, Country = country };
            country.User = user;

            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            return result;
        }

        public async Task<Country> GetCountryByUserID(string userID)
        {
            return await _dbContext.Countries.Where(c => c.UserID == userID).SingleOrDefaultAsync();


        }
    }
}

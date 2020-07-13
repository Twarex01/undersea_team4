using Microsoft.AspNetCore.Identity;
using StrategyGame.Bll.DTO.common;
using StrategyGame.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
    public interface IUserService
    {
        public Task<IdentityResult> RegisterUserAsync(RegisterDTO registerDTO);

        public Task<bool> AuthenticateUser(LoginDTO loginDTO);
    }
}

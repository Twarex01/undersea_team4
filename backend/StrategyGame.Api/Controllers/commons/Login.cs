using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StrategyGame.Api.Controllers.commons
{
    [Route("api/[controller]")]
    [ApiController]
    public class Login : ControllerBase
    {
        [HttpPost]
        public void SignIn(string name, string pw)
        {
            throw new Exception("TODO");
        }
    }
}

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
    public class Register : ControllerBase
    {
        [HttpPost]
        public void Registration(string name, string pw, string country)
        {
            throw new Exception("TODO");
        }

    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StrategyGame.Api.Controllers.game
{
    [Route("api/[controller]")]
    [ApiController]
    public class Upgrades : ControllerBase
    {

        [HttpGet]
        public void UpgradesData()
        {
            throw new Exception("TODO");
        }

    }
}

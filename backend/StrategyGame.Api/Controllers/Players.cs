﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrategyGame.Bll.DTO;

namespace StrategyGame.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Players : ControllerBase
    {
        //GEt api/players
        [HttpGet]
        public List<PlayerDTO> PlayerList()
        {
            throw new NotImplementedException("TODO");
        }

    }
}

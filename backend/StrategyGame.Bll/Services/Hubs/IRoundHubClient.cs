﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services.Hubs
{
    public interface IRoundHubClient
    {
        Task RefreshInfo();
    }
}
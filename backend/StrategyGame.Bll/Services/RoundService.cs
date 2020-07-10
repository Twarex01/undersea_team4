using StrategyGame.Dal;
using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Bll.Services
{
    class RoundService : IRoundService
    {

        private AppDbContext _dbContext;

        public RoundService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }


    }
}

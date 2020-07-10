using Microsoft.AspNetCore.Identity;
using StrategyGame.Dal;
using StrategyGame.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
    class RoundService : IRoundService
    {

        private AppDbContext _dbContext;
        private UserManager<User> _userManager;

        public RoundService(AppDbContext dbContext, UserManager<User> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        private void GeneratePearlIncome(Country country)
        {
            var pearls = country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Pearl.ID);
            pearls.Amount += (int)Math.Truncate( pearls.ProductionBase * pearls.ProductionMultiplier);
        }
        public async void SimulateRound() //nem jó még
        {
            var PlayerList = _userManager.Users.ToList();

            foreach(var player in PlayerList)
            {
                GeneratePearlIncome(player.Country);
            }



        }
    }
}

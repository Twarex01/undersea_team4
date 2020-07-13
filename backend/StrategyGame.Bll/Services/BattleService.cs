using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using StrategyGame.Dal;
using StrategyGame.Model;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Services
{
    public class BattleService : IBattleService
    {

        private AppDbContext _context;

        public BattleService(AppDbContext context)
        {
            _context = context;
        }


        public async Task<int> CountUnitsOfTypeNotAtHomeAsync(int countryId, int unitDataId)
        {

            var count = await _context.AttackingUnits.Where(a => a.UnitDataID == unitDataId && a.Battle.AttackingCountryID == countryId)
                .SumAsync(k => k.Count).ConfigureAwait(false);

            return count;
        }

        public async Task<int> CountUnitsOfTypeAtHomeAsync(int countryId, int unitDataId)
        {

            var count = await _context.Units.Where(u => u.UnitDataID == unitDataId && u.CoutryID == countryId)
                .SumAsync(k => k.Count).ConfigureAwait(false);

            count -= CountUnitsOfTypeNotAtHomeAsync(countryId, unitDataId).Result;

            return count;
        }

        public async Task<int> CountAttackPowerInBattleAsync(int battleId)
        {

            var count = await _context.AttackingUnits.Include(a => a.Battle).Include(a => a.UnitData).Where(a => a.BattleID == battleId)
                .SumAsync(x => x.Count * x.UnitData.ATK).ConfigureAwait(false); ;            

            return count;
        }




    }
}

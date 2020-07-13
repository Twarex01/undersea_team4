using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using StrategyGame.Dal;
using StrategyGame.Model;
using System;
using System.Collections.Generic;
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
                .SumAsync(x => x.Count * x.UnitData.ATK).ConfigureAwait(false);       

            return count;
        }

        public double CountDefensePowerInBattle(int countryId)
        {


            var distinctUnitDataIds = _context.Units.Select(u => u.UnitDataID).Distinct();

            double count = 0;

            foreach (int unitDataId in distinctUnitDataIds)
            {
                count += CountUnitsOfTypeAtHomeAsync(countryId, unitDataId).Result * _context.UnitData.Where(u => u.ID == unitDataId).Select(u => u.DEF).First();
            }

            return count;
        }

        public void SendUnitsToAttack(int attackingCountryId, int defendingCountryId, int numberOfUnits, int unitDataId)
        {
            var attackingCountry = _context.Countries.Where(c => c.ID == attackingCountryId).FirstOrDefault();
            var defendingCountry = _context.Countries.Where(c => c.ID == defendingCountryId).FirstOrDefault();
            var unitData = _context.UnitData.Where(u => u.ID == unitDataId).FirstOrDefault();
            if (attackingCountry == null)
            {
                throw new Exception("Attacking country is invalid");
            }
            if (defendingCountry == null)
            {
                throw new Exception("Defending country is invalid");
            }
            if (unitData == null)
            {
                throw new Exception("Unit Data is invalid");
            }

            var count = CountUnitsOfTypeAtHomeAsync(attackingCountryId, unitDataId).Result;

            if (numberOfUnits > count)
            {
                throw new Exception("Not enough units available");
            }
            else 
            {
                
                var battle = _context.Battles.Where(b => b.AttackingCountryID == attackingCountryId && b.DefendingCountryID == defendingCountryId).FirstOrDefault();

                if (battle == null)
                {
                    battle = new Battle
                    {
                        AttackingCountry = attackingCountry,
                        DefendingCountry = defendingCountry,
                        AttackingUnits = new List<AttackingUnit>(),
                        Round = 0 //TEMP
                    };

                    battle.AttackingUnits.Add(new AttackingUnit { Battle = battle, Count = numberOfUnits, UnitData = unitData });

                    _context.Battles.Add(battle);

                }

                    var unit = battle.AttackingUnits.Where(a => a.UnitDataID == unitDataId).FirstOrDefault();

                    if (unit != null)
                    {
                        battle.AttackingUnits.Add(new AttackingUnit { Battle = battle, Count = numberOfUnits, UnitData = unitData });

                    }
                    else
                    {
                        unit.Count += numberOfUnits;    
                    }

                _context.SaveChanges();
       
            }
        }

    }
}

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
        private Random moraleGenerator = new Random();

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

            var count = await _context.Units.Where(u => u.UnitDataID == unitDataId && u.CountryID == countryId)
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

        public void CommenceBattle(int battleId) 
        {

            

            double multiplier = moraleGenerator.Next(0, 1) > 0 ? 1.05 : 0.95;
            


            var ATKPower = CountAttackPowerInBattleAsync(battleId).Result * multiplier;
            var DEFPower = CountDefensePowerInBattle(battleId);

            var defCountryId = _context.Battles.Where(b => b.ID == battleId).SingleOrDefault().ID;
            var atkCountryId = _context.Battles.Where(b => b.ID == battleId).SingleOrDefault().ID;

            if (ATKPower > DEFPower)
            {
               
                var distinctUnitDataIds = _context.UnitData.Select(u => u.ID).Distinct();

                

                foreach (int unitDataId in distinctUnitDataIds)
                {

                    int unitAtHomeLost = CountUnitsOfTypeAtHomeAsync(defCountryId, unitDataId).Result;
                    unitAtHomeLost = (int)Math.Ceiling(unitAtHomeLost * 0.9);
                    _context.Units.Where(u => u.CountryID == defCountryId && u.UnitDataID == unitDataId).ToList().ForEach(c => c.Count = c.Count - unitAtHomeLost);
                }

                var distinctResourceDataIds = _context.ResourceData.Select(u => u.ID).Distinct();

                foreach (int resourceDataId in distinctResourceDataIds)
                {
                    int resourcesTaken = _context.Resources.Include(r => r.Country).Where(r => r.ResourceDataID == resourceDataId && r.CoutryID == defCountryId).Select(r => r.Amount).First();
                    resourcesTaken = (int)Math.Ceiling(resourcesTaken * 0.5);
                    _context.Resources.Include(r => r.Country).Where(u => u.CoutryID == atkCountryId && u.ResourceDataID == resourceDataId).ToList().ForEach(r => r.Amount = r.Amount + resourcesTaken);
                    _context.Resources.Include(r => r.Country).Where(u => u.CoutryID == defCountryId && u.ResourceDataID == resourceDataId).ToList().ForEach(r => r.Amount = r.Amount - resourcesTaken);
                }
            }
            else 
            {
                var attackingUnits = _context.AttackingUnits.Include(a => a.Battle).Where(a => a.BattleID == battleId).ToList();

                var distinctUnitDataIds = _context.UnitData.Select(u => u.ID).Distinct();

                

                foreach (int unitDataId in distinctUnitDataIds)
                {
                    int unitAttackingLost = CountUnitsOfTypeAtHomeAsync(atkCountryId, unitDataId).Result;
                    unitAttackingLost = (int)Math.Ceiling(unitAttackingLost * 0.9);
                    _context.Units.Where(u => u.CountryID == atkCountryId && u.UnitDataID == unitDataId).ToList().ForEach(c => c.Count = c.Count - unitAttackingLost);
                    _context.AttackingUnits.Include(a => a.Battle).ThenInclude(b => b.AttackingCountry).Where(a => a.Battle.AttackingCountryID == atkCountryId)
                        .ToList().ForEach(c => c.Count = c.Count - unitAttackingLost);
                }
            }

            _context.SaveChanges();
        }
    }
}

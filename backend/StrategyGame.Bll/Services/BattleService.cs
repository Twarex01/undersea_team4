using Microsoft.EntityFrameworkCore;
using StrategyGame.Bll.DTO;
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
            var count = await _context.AttackingUnits.Include(a => a.Battle).Where(a => a.UnitDataID == unitDataId && a.Battle.AttackingCountryID == countryId)
                .SumAsync(k => k.Count).ConfigureAwait(false);
            return count;
        }

        public async Task<int> CountUnitsOfTypeAtHomeAsync(int countryId, int unitDataId)
        {
            var count = _context.Units.Where(u => u.UnitDataID == unitDataId && u.CountryID == countryId).SingleOrDefault().Count;
            count -= await CountUnitsOfTypeNotAtHomeAsync(countryId, unitDataId);
            return count;
        }

        public async Task<int> CountAttackPowerInBattleAsync(int battleId)
        {
            var count = await _context.AttackingUnits.Include(a => a.Battle).Include(a => a.UnitData).Where(a => a.BattleID == battleId)
                .SumAsync(x => x.Count * x.UnitData.ATK).ConfigureAwait(false);
            return count;
        }

        public async Task<double> CountDefensePowerInBattleAsync(int countryId)
        {
            double count = 0;
            foreach (int unitDataId in _context.UnitData.Select(u => u.ID))
            {
                count += await CountUnitsOfTypeAtHomeAsync(countryId, unitDataId) * _context.UnitData.Where(u => u.ID == unitDataId).Select(u => u.DEF).First();
            }

            return count;
        }

        public async Task SendAllTypesToAttack(BattleDTO battleDto)
        {
            var attackingCountry = _context.Countries.Where(c => c.ID == battleDto.IdAtt).FirstOrDefault();
            var defendingCountry = _context.Countries.Where(c => c.ID == battleDto.IdDef).FirstOrDefault();
            if (attackingCountry == null)
            {
                throw new Exception("Attacking country is not found");
            }
            if (defendingCountry == null)
            {
                throw new Exception("Defending country is not found");
            }

            foreach (UnitDTO unitDto in battleDto.Army)
            {

                await SendUnitsOfTypeToAttack(battleDto.IdAtt, battleDto.IdDef, unitDto.Count, unitDto.UnitTypeID);
            }
            _context.SaveChanges();
        }

        public async Task SendUnitsOfTypeToAttack(int attackingCountryId, int defendingCountryId, int numberOfUnits, int unitDataId)
        {
            var attackingCountry = _context.Countries.Where(c => c.ID == attackingCountryId).FirstOrDefault();
            var defendingCountry = _context.Countries.Where(c => c.ID == defendingCountryId).FirstOrDefault();
            var unitData = _context.UnitData.Where(u => u.ID == unitDataId).FirstOrDefault();
            if (unitData == null)
            {
                throw new Exception("Unit Data is not found");
            }

            var count = await CountUnitsOfTypeAtHomeAsync(attackingCountryId, unitDataId);
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
                    battle.AttackingUnits.Add(new AttackingUnit { Count = numberOfUnits, UnitData = unitData });
                    _context.Battles.Add(battle);

                }
                else
                {
                    var unit = battle.AttackingUnits.Where(a => a.UnitDataID == unitDataId).FirstOrDefault();
                    if (unit == null)
                    {
                        battle.AttackingUnits.Add(new AttackingUnit { Battle = battle, Count = numberOfUnits, UnitDataID = unitData.ID });
                    }
                    else
                    {
                        unit.Count += numberOfUnits;
                    }

                }
            }
        }

        public async Task CommenceBattle(int battleId)
        {
            double multiplier = moraleGenerator.Next(0, 1) > 0 ? 1.05 : 0.95;
            var ATKPower = await CountAttackPowerInBattleAsync(battleId) * multiplier;
            var DEFPower = await CountDefensePowerInBattleAsync(battleId);
            var defCountryId = _context.Battles.Where(b => b.ID == battleId).SingleOrDefault().ID;
            var atkCountryId = _context.Battles.Where(b => b.ID == battleId).SingleOrDefault().ID;

            if (ATKPower > DEFPower)
            {

                foreach (int unitDataId in _context.UnitData.Select(u => u.ID))
                {

                    int unitAtHomeLost = CountUnitsOfTypeAtHomeAsync(defCountryId, unitDataId).Result;
                    unitAtHomeLost = (int)Math.Ceiling(unitAtHomeLost * 0.9);
                    _context.Units.Where(u => u.CountryID == defCountryId && u.UnitDataID == unitDataId).SingleOrDefault().Count -= unitAtHomeLost;
                }

                foreach (int resourceDataId in _context.ResourceData.Select(u => u.ID))
                {
                    int resourcesTaken = _context.Resources.Include(r => r.Country).Where(r => r.ResourceDataID == resourceDataId && r.CoutryID == defCountryId).Select(r => r.Amount).First();
                    resourcesTaken = (int)Math.Ceiling(resourcesTaken * 0.5);
                    _context.Resources.Include(r => r.Country).Where(u => u.CoutryID == atkCountryId && u.ResourceDataID == resourceDataId).SingleOrDefault().Amount += resourcesTaken;
                    _context.Resources.Include(r => r.Country).Where(u => u.CoutryID == defCountryId && u.ResourceDataID == resourceDataId).SingleOrDefault().Amount -= resourcesTaken;
                }
            }
            else
            {
                var attackingUnits = _context.AttackingUnits.Include(a => a.Battle).Where(a => a.BattleID == battleId).ToList();

                foreach (int unitDataId in _context.UnitData.Select(u => u.ID))
                {
                    int unitAttackingLost = await CountUnitsOfTypeAtHomeAsync(atkCountryId, unitDataId);
                    unitAttackingLost = (int)Math.Ceiling(unitAttackingLost * 0.9);
                    _context.Units.Where(u => u.CountryID == atkCountryId && u.UnitDataID == unitDataId).SingleOrDefault().Count -= unitAttackingLost;
                }
            }
            await _context.SaveChangesAsync();
        }

        public async Task<List<BattleDetailsDTO>> GetCountryBattles(int countryId)
        {
            var output = new List<BattleDetailsDTO>();
            var battles = await _context.Battles
                .Include(b => b.AttackingUnits).ThenInclude(a => a.UnitData)
                .Include(b => b.DefendingCountry)
                .Where(b => b.AttackingCountryID == countryId).ToListAsync();
            foreach (var battle in battles)
            {
                var namedArmy = new List<UnitWithName>();
                foreach (var unit in battle.AttackingUnits)
                {
                    namedArmy.Add(new UnitWithName() { Count = unit.Count, Name = unit.UnitData.Name });
                }
                output.Add(new BattleDetailsDTO() { DefenderName = battle.DefendingCountry.Name, Units = namedArmy });
            }
            return output;
        }
    }
}

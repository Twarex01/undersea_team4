﻿using Microsoft.EntityFrameworkCore;
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
        private Random spyProbability = new Random();

        public BattleService(AppDbContext context)
        {
            _context = context;
        }


        public int CountUnitsOfTypeNotAtHome(int countryId, int unitDataId)
        {
            var count = _context.AttackingUnits.Include(a => a.Battle).Where(a => a.UnitDataID == unitDataId && a.Battle.AttackingCountryID == countryId).Sum(k => k.Count);
            return count;
        }

        public int CountUnitsOfTypeAtHome(int countryId, int unitDataId)
        {
            var allUnitsofType = _context.Units.Where(u => u.UnitDataID == unitDataId && u.CountryID == countryId).SingleOrDefault();
            if (allUnitsofType == null) return 0;
            var count = allUnitsofType.Count - CountUnitsOfTypeNotAtHome(countryId, unitDataId);
            return count;
        }

        public int CountAttackPowerInBattle(int battleId)
        {
            var count = _context.AttackingUnits.Include(a => a.Battle).Include(a => a.UnitData).Where(a => a.BattleID == battleId).Sum(x => x.Count * x.UnitData.ATK);
            return count;
        }

        public double CountDefensePowerInBattle(int battleId)
        {
            var battle = _context.Battles.SingleOrDefault(b => b.ID == battleId);
            var defendingcountry = _context.Countries.SingleOrDefault(c => c.ID == battle.DefendingCountryID);
            var unitDatas = _context.UnitData.ToList();
            double count = 0;
            foreach (var unitData in unitDatas)
            {
                var defendingUnitsofType = CountUnitsOfTypeAtHome(defendingcountry.ID, unitData.ID);

                count += defendingUnitsofType * unitData.DEF;
            }

            return count * defendingcountry.DefenseModifier;
        }

        public void SendAllTypesToAttack(BattleDTO battleDto)
        {
            var attackingCountry = _context.Countries.Where(c => c.ID == battleDto.IdAtt).FirstOrDefault();
            var defendingCountry = _context.Countries.Where(c => c.ID == battleDto.IdDef).FirstOrDefault();
            if (attackingCountry == null)
            {
                throw new HttpResponseException { Status = 400, Value = "Attacking country is not found" };
            }
            if (defendingCountry == null)
            {
                throw new HttpResponseException { Status = 400, Value = "Defending country is not found" };
            }

            foreach (UnitDTO unitDto in battleDto.Army)
            {

                SendUnitsOfTypeToAttack(battleDto.IdAtt, battleDto.IdDef, unitDto.Count, unitDto.UnitTypeID);
            }
            
        }

        public void SendUnitsOfTypeToAttack(int attackingCountryId, int defendingCountryId, int numberOfUnits, int unitDataId)
        {
            var attackingCountry = _context.Countries.Where(c => c.ID == attackingCountryId).FirstOrDefault();
            var defendingCountry = _context.Countries.Where(c => c.ID == defendingCountryId).FirstOrDefault();
            var unitData = _context.UnitData.Where(u => u.ID == unitDataId).FirstOrDefault();
            if (unitData == null)
            {
                throw new HttpResponseException { Status = 400, Value = "Unit Data is not found" };
            }

            var count = CountUnitsOfTypeAtHome(attackingCountryId, unitDataId);
            if (numberOfUnits > count)
            {
                throw new HttpResponseException { Status = 400, Value = "Not enough units available" };
            }
            else
            {
                var battle = _context.Battles.Include(b=> b.AttackingUnits).Where(b => b.AttackingCountryID == attackingCountryId && b.DefendingCountryID == defendingCountryId).FirstOrDefault();

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

                _context.SaveChanges();
            }
        }

        public void Spying (int battleId)
        {
            double chance = 0.6;
            var defCountry = _context.Battles.Include(b => b.DefendingCountry).Where(b => b.ID == battleId).SingleOrDefault().DefendingCountry;
            var atkCountry = _context.Battles.Include(b => b.AttackingCountry).Where(b => b.ID == battleId).SingleOrDefault().AttackingCountry;
            var ATKSpyCount = CountUnitsOfTypeNotAtHome(atkCountry.ID, 4);
            var DEFSpyCount = CountUnitsOfTypeAtHome(defCountry.ID, 4);
            var diffCount = ATKSpyCount - DEFSpyCount;
            chance += diffCount * 0.05;

            if (spyProbability.Next(0, 100) < chance*100) //sikeres volt a kémkedés
            {
                //eltárolom a védekező erejéről az infót magamnak
                var DEFPowerInfo = CountDefensePowerInBattle(battleId);
            }
            else    //sikertelen volt a kémkedés
            {
                //törlöm a spyokat az adatbázisomból
                _context.Units.Where(u => u.CountryID == atkCountry.ID && u.UnitDataID == 4).SingleOrDefault().Count = 0;
            }
        }

        public void CommenceBattle(int battleId)
        {
            double multiplier = moraleGenerator.Next(0, 2) > 0 ? 1.05 : 0.95;
            var ATKPower = CountAttackPowerInBattle(battleId) * multiplier;
            var DEFPower = CountDefensePowerInBattle(battleId);
            var defCountry = _context.Battles.Include(b=> b.DefendingCountry).Where(b => b.ID == battleId).SingleOrDefault().DefendingCountry;
            var atkCountry = _context.Battles.Include(b=> b.AttackingCountry).Where(b => b.ID == battleId).SingleOrDefault().AttackingCountry;

            if (ATKPower > DEFPower)
            {

                foreach (int unitDataId in _context.UnitData.Select(u => u.ID))
                {

                    int unitAtHomeLost = CountUnitsOfTypeAtHome(defCountry.ID, unitDataId);
                    if (unitAtHomeLost == 0) continue;
                    unitAtHomeLost = (int)Math.Ceiling(unitAtHomeLost * 0.1);
                    _context.Units.Where(u => u.CountryID == defCountry.ID && u.UnitDataID == unitDataId).SingleOrDefault().Count -= unitAtHomeLost;
                    
                }

                foreach (int resourceDataId in _context.ResourceData.Select(u => u.ID))
                {
                    int resourcesTaken = _context.Resources.Include(r => r.Country).Where(r => r.ResourceDataID == resourceDataId && r.CoutryID == defCountry.ID).Select(r => r.Amount).First();
                    resourcesTaken = (int)Math.Ceiling(resourcesTaken * 0.5);
                    _context.Resources.Include(r => r.Country).Where(u => u.CoutryID == atkCountry.ID && u.ResourceDataID == resourceDataId).SingleOrDefault().Amount += resourcesTaken;
                    var defenderResource = _context.Resources.SingleOrDefault(r => r.ResourceDataID == resourceDataId && r.CoutryID == defCountry.ID);
                    if (defenderResource.Amount < resourcesTaken) defenderResource.Amount = 0;
                    else defenderResource.Amount -= resourcesTaken;
                    
                }
            }
            else
            {
                var attackingUnits = _context.AttackingUnits.Include(a => a.Battle).Where(a => a.BattleID == battleId).ToList();

                foreach (int unitDataId in _context.UnitData.Select(u => u.ID))
                {
                    int unitAttackingLost = CountUnitsOfTypeAtHome(atkCountry.ID, unitDataId);
                    unitAttackingLost = (int)Math.Ceiling(unitAttackingLost * 0.1);
                    _context.Units.Where(u => u.CountryID == atkCountry.ID && u.UnitDataID == unitDataId).SingleOrDefault().Count -= unitAttackingLost;
                    
                }
            }
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

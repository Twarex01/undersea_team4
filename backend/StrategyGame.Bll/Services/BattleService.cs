using FluentValidation.Results;
using FluentValidation.Validators;
using Microsoft.EntityFrameworkCore;
using StrategyGame.Bll.DTO;
using StrategyGame.Bll.DTO.Validators;
using StrategyGame.Bll.Services.Validators;
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

		public double CountAttackPowerInBattle(int battleId)
		{
			var battle = _context.Battles.SingleOrDefault(b => b.ID == battleId);
			var attackingcountry = _context.Countries.SingleOrDefault(c => c.ID == battle.AttackingCountryID);
			var count = _context.AttackingUnits.Include(a => a.Battle).Include(a => a.UnitData).Where(a => a.BattleID == battleId).Sum(x => x.Count * x.UnitData.ATK);
			
			return count * attackingcountry.AttackModifier;
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

			foreach (UnitDTO unit in battleDto.Army) 
			{
				UnitDTOValidator unitValidator = new UnitDTOValidator();
				ValidationResult validatorResults = unitValidator.Validate(unit);

				if (!validatorResults.IsValid)
				{
					foreach (var failure in validatorResults.Errors)
					{
						throw new HttpResponseException { Status = 400, Value = failure.ErrorMessage };
					}
				}
			}

			var attackingCountry = _context.Countries.Where(c => c.ID == battleDto.IdAtt).FirstOrDefault();
			var defendingCountry = _context.Countries.Where(c => c.ID == battleDto.IdDef).FirstOrDefault();
			if (attackingCountry == null)
			{
				throw new HttpResponseException { Status = 400, Value = "Támadó ország nem található" };
			}
			if (defendingCountry == null)
			{
				throw new HttpResponseException { Status = 400, Value = "Védekező ország nem található" };
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
				throw new HttpResponseException { Status = 400, Value = "Egységadat nem található" };
			}

			var count = CountUnitsOfTypeAtHome(attackingCountryId, unitDataId);
			if (numberOfUnits > count)
			{
				throw new HttpResponseException { Status = 400, Value = "Nincs elég egységed" };
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
						Round = _context.Round.SingleOrDefault().RoundNumber
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

		public int CalculateMaximumPotentialDefensePower(int countryID)
		{
			return _context.Units.Include(u => u.UnitData).Where(u => u.CountryID == countryID).Sum(u => u.UnitData.DEF * u.Count);
		}


		public void SendExplorersToCountry(SendExplorationDTO explorationDTO)
		{
			SendExplorationDTOValidator explorationValidator = new SendExplorationDTOValidator();
			ValidationResult validatorResults = explorationValidator.Validate(explorationDTO);

			if (!validatorResults.IsValid)
			{
				foreach (var failure in validatorResults.Errors)
				{
					throw new HttpResponseException { Status = 400, Value = failure.ErrorMessage };
				}
			}

			int allExplorers = 0;
			var foundExplorers = _context.Units.SingleOrDefault(u => u.CountryID == explorationDTO.SenderCountryID && u.UnitDataID == UnitData.Explorer.ID);
			if (foundExplorers != null) allExplorers = foundExplorers.Count;
			var exploring = _context.Explorations.Where(e => e.SenderCountryID == explorationDTO.SenderCountryID).Sum(e => e.NumberOfExplorers);
			var availableExplorers = allExplorers - exploring;
			if (availableExplorers < explorationDTO.NumberOfExplorers) {
				throw new HttpResponseException { Status = 400, Value = "Nincs elég felfedező" };
			}
			var existingExp = _context.Explorations.SingleOrDefault(e => e.SenderCountryID == explorationDTO.SenderCountryID && e.VictimCountryID == explorationDTO.VictimCountryID);
			if(existingExp== null)
			{
				var newExploration = new Exploration()
				{
					NumberOfExplorers = explorationDTO.NumberOfExplorers,
					SenderCountryID = explorationDTO.SenderCountryID,
					VictimCountryID = explorationDTO.VictimCountryID
				};
				_context.Explorations.Add(newExploration);
			}
			else
			{
				existingExp.NumberOfExplorers += explorationDTO.NumberOfExplorers;
			}

			_context.SaveChanges();
			
		}

		public List<ExplorationInfoDTO> GetExplorationInfo(int countryId)
		{
			List<ExplorationInfoDTO> output = new List<ExplorationInfoDTO>();
			foreach(var expInfo in _context.ExplorationInfos.Include(e=> e.ExposedCountry).Where(e=> e.InformedCountryID == countryId))
			{
				output.Add(new ExplorationInfoDTO()
				{
					ExposedCountryName = expInfo.ExposedCountry.Name,
					LastKnownDefensePower = expInfo.LastKnownDefensePower,
					Round = expInfo.Round
				});
			}
			return output;
		}


		public void SimulateExploration(int explorationId)
		{
			double chance = 0.6;
			int round = _context.Round.SingleOrDefault().RoundNumber;
			var exploration = _context.Explorations.Include(e => e.VictimCountry).Include(e => e.SenderCountry).SingleOrDefault(e => e.ID == explorationId);
			var victimCountry = exploration.VictimCountry;
			var senderCountry = exploration.SenderCountry;
			var senderSpyCount = exploration.NumberOfExplorers;
			var victimSpyCount = _context.Units.SingleOrDefault(u=> u.CountryID == victimCountry.ID && u.UnitDataID == UnitData.Explorer.ID)?.Count - _context.Explorations.Where(e=> e.SenderCountryID == victimCountry.ID).Sum(e=> e.NumberOfExplorers);
			if (victimSpyCount == null) victimSpyCount = 0;
			var diffCount = senderSpyCount - (int)victimSpyCount;
			chance += diffCount * 0.05;

			ExplorationReport explorationReport =
				new ExplorationReport
				{
					ExplorersSent = senderSpyCount,
					SenderCountryID = senderCountry.ID,
					SenderCountryName = senderCountry.Name,
					VictimCountryID = victimCountry.ID,
					VictimCountryName = victimCountry.Name,
				};

			if (spyProbability.Next(0, 100) <= chance * 100 || chance >= 1) //sikeres volt a kémkedés
			{
				explorationReport.Successful = true;
				explorationReport.ExposedDefensePower = CalculateMaximumPotentialDefensePower(victimCountry.ID);
				var existingInfo = _context.ExplorationInfos.SingleOrDefault(e => e.InformedCountryID == senderCountry.ID && e.ExposedCountryID == victimCountry.ID);
				if (existingInfo != null)
				{
					existingInfo.Round = round;
					existingInfo.LastKnownDefensePower = CalculateMaximumPotentialDefensePower(victimCountry.ID);
				}
				else
				{
					var explorationInfo = new ExplorationInfo()
					{
						ExposedCountry = victimCountry,
						InformedCountry = senderCountry,
						LastKnownDefensePower = CalculateMaximumPotentialDefensePower(victimCountry.ID),
						Round = round
					};
					_context.ExplorationInfos.Add(explorationInfo);
				}
			}
			else    //sikertelen volt a kémkedés
			{
				explorationReport.Successful = false;
				_context.Units.Where(u => u.CountryID == senderCountry.ID && u.UnitDataID == UnitData.Explorer.ID).SingleOrDefault().Count -= exploration.NumberOfExplorers;
			}

			_context.ExplorationReports.Add(explorationReport);

			_context.SaveChanges();
		}

		public void CommenceBattle(int battleId)
		{


			var battle = _context.Battles.Where(b => b.ID == battleId).FirstOrDefault();
			if (battle == null) throw new HttpResponseException { Status = 400, Value = "Nincs ilyen csata"};

			double multiplier = moraleGenerator.Next(0, 2) > 0 ? 1.05 : 0.95;
			var ATKPower = CountAttackPowerInBattle(battleId) * multiplier;
			var DEFPower = CountDefensePowerInBattle(battleId);
			var defCountry = _context.Battles.Include(b=> b.DefendingCountry).Where(b => b.ID == battleId).SingleOrDefault().DefendingCountry;
			var atkCountry = _context.Battles.Include(b=> b.AttackingCountry).Where(b => b.ID == battleId).SingleOrDefault().AttackingCountry;
			var roundNumber = _context.Round.FirstOrDefault().RoundNumber;
			var attackingUnits = battle.AttackingUnits;
			var reportedUnits = new List<ReportedUnit>();

			foreach (AttackingUnit attackingUnit in attackingUnits) 
			{
				reportedUnits.Add(new ReportedUnit { Name = attackingUnit.UnitData.Name, Count = attackingUnit.Count });
			
			}

			BattleReport battleHistory = 
				new BattleReport 
				{ 
					ATKPower = ATKPower, 
					DEFPower = DEFPower, 
					AttackerID = atkCountry.ID, 
					DefenderID = defCountry.ID,
					AttackerName = atkCountry.Name,
					DefenderName = defCountry.Name,
					Round = roundNumber,
					AttackerArmy = reportedUnits,
					Loot = null,
					UnitsLost = null
				};

			if (ATKPower > DEFPower)
			{

				battleHistory.Succesful = true;

				var lostUnits = new List<LostUnit>();

				foreach (int unitDataId in _context.UnitData.Select(u => u.ID))
				{
					int unitAtHomeLost = CountUnitsOfTypeAtHome(defCountry.ID, unitDataId);
					if (unitAtHomeLost == 0) continue;
					unitAtHomeLost = (int)Math.Ceiling(unitAtHomeLost * 0.1);
					var unit = _context.Units.Include(u => u.UnitData).Where(u => u.CountryID == defCountry.ID && u.UnitDataID == unitDataId).SingleOrDefault();
					unit.Count -= unitAtHomeLost;

					lostUnits.Add(new LostUnit { LostAmount = unitAtHomeLost, UnitName = unit.UnitData.Name });
				}

				var loot = new List<Loot>();

				foreach (int resourceDataId in _context.ResourceData.Select(u => u.ID))
				{
					var resource = _context.Resources.Include(r => r.ResourceData).Where(r => r.ResourceDataID == resourceDataId).FirstOrDefault();
					int resourcesTaken = _context.Resources.Include(r => r.Country).Where(r => r.ResourceDataID == resourceDataId && r.CoutryID == defCountry.ID).Select(r => r.Amount).First();
					//Ez így elég retek de nem akarom most piszkálni.

					resourcesTaken = (int)Math.Ceiling(resourcesTaken * 0.5);
					_context.Resources.Include(r => r.Country).Where(u => u.CoutryID == atkCountry.ID && u.ResourceDataID == resourceDataId).SingleOrDefault().Amount += resourcesTaken;
					var defenderResource = _context.Resources.SingleOrDefault(r => r.ResourceDataID == resourceDataId && r.CoutryID == defCountry.ID);
					if (defenderResource.Amount < resourcesTaken) defenderResource.Amount = 0;
					else defenderResource.Amount -= resourcesTaken;

					loot.Add(new Loot { ResourceName = resource.ResourceData.Name, Amount = resourcesTaken });
				}
			}
			else
			{

				battleHistory.Succesful = false;

				var lostUnits = new List<LostUnit>();

				var allAttackingUnits = _context.AttackingUnits.Include(a => a.Battle).Include(a => a.UnitData).Where(a => a.BattleID == battleId).ToList();

				foreach (int unitDataId in _context.UnitData.Select(u => u.ID))
				{
					int unitAttackingLost = allAttackingUnits.Where(a => a.UnitData.ID == unitDataId).Select(a => a.Count).SingleOrDefault();
					if (unitAttackingLost == 0) continue;
					unitAttackingLost = (int)Math.Ceiling(unitAttackingLost * 0.1);
					var unit = _context.Units.Include(u => u.UnitData).Where(u => u.CountryID == defCountry.ID && u.UnitDataID == unitDataId).SingleOrDefault();
					unit.Count -= unitAttackingLost;

					lostUnits.Add(new LostUnit { LostAmount = unitAttackingLost, UnitName = unit.UnitData.Name });
				}
			}

			_context.BattleReports.Add(battleHistory);

			_context.SaveChanges();

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

		public List<ExplorationDetailsDTO> GetCountryExplorations(int countryId)
		{
			List<ExplorationDetailsDTO> output = new List<ExplorationDetailsDTO>(); 
			foreach(var exploration in _context.Explorations.Include(e=> e.VictimCountry).Where(e=> e.SenderCountryID== countryId)){
				output.Add(new ExplorationDetailsDTO() { NumberOfExplorers = exploration.NumberOfExplorers, VictimCountryName = exploration.VictimCountry.Name });
			}
			return output;
		}

	}

}

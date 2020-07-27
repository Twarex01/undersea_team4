using FluentValidation.Results;
using FluentValidation.Validators;
using Hangfire.States;
using Microsoft.EntityFrameworkCore;
using StrategyGame.Bll.DTO;
using StrategyGame.Bll.DTO.Validators;
using StrategyGame.Bll.Services.Validators;
using StrategyGame.Dal;
using StrategyGame.Dal.Migrations;
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


		public async Task<int> CountUnitsOfTypeNotAtHome(int countryId, int unitDataId)
		{
			var count =  await _context.AttackingUnits.Include(a => a.Battle).Where(a => a.UnitDataID == unitDataId && a.Battle.AttackingCountryID == countryId).SumAsync(k => k.Count);
			return count;
		}

		public async Task<int> CountUnitsOfTypeAtHome(int countryId, int unitDataId)
		{
			var allUnitsofType = await _context.Units.SingleOrDefaultAsync(u => u.UnitDataID == unitDataId && u.CountryID == countryId);
			if (allUnitsofType == null) return 0;
			var count = allUnitsofType.Count - await CountUnitsOfTypeNotAtHome(countryId, unitDataId);
			return count;
		}

		public async Task<double> CountAttackPowerInBattle(int battleId)
		{
			var battle = await _context.Battles.SingleOrDefaultAsync(b => b.ID == battleId);
			var attackingcountry = await _context.Countries.SingleOrDefaultAsync(c => c.ID == battle.AttackingCountryID);
			var generalCount = await CountUnitsOfTypeNotAtHome(attackingcountry.ID, 5);
			var count = await _context.AttackingUnits.Include(a => a.Battle).Include(a => a.UnitData).Where(a => a.BattleID == battleId).SumAsync(x => x.Count * x.UnitData.ATK);
			
			return count * (1 + generalCount * 0.01) * attackingcountry.AttackModifier;
		}

		public async Task<double> CountDefensePowerInBattle(int battleId)
		{
			var battle = await _context.Battles.SingleOrDefaultAsync(b => b.ID == battleId);
			var defendingcountry = await _context.Countries.SingleOrDefaultAsync(c => c.ID == battle.DefendingCountryID);
			var generalCount = await CountUnitsOfTypeNotAtHome(defendingcountry.ID, 5);
			var unitDatas = await _context.UnitData.ToListAsync();
			double count = 0;
			foreach (var unitData in unitDatas)
			{
				var defendingUnitsofType = await CountUnitsOfTypeAtHome(defendingcountry.ID, unitData.ID);

				count += defendingUnitsofType * unitData.DEF;
			}

			return count * (1 + generalCount * 0.01) * defendingcountry.DefenseModifier;
		}

		public async Task SendAllTypesToAttack(BattleDTO battleDto)
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

			var attackingCountry = await _context.Countries.FirstOrDefaultAsync(c => c.ID == battleDto.IdAtt);
			var defendingCountry = await _context.Countries.FirstOrDefaultAsync(c => c.ID == battleDto.IdDef);
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

				await SendUnitsOfTypeToAttack(attackingCountry, defendingCountry, unitDto.UnitCount, unitDto.UnitTypeID);
			}

			await _context.SaveChangesAsync();
			
		}

		public async Task SendUnitsOfTypeToAttack(Country attackingCountry, Country defendingCountry, int numberOfUnits, int unitDataId)
		{

			if (attackingCountry.ID == defendingCountry.ID)
				throw new HttpResponseException { Status = 400, Value = "Ne bántsd magad :c" };
			
			var unitData = await _context.UnitData.FirstOrDefaultAsync(u => u.ID == unitDataId);
			if (unitData == null)
			{
				throw new HttpResponseException { Status = 400, Value = "Egységadat nem található" };
			}

			var count = await CountUnitsOfTypeAtHome(attackingCountry.ID, unitDataId);
			if (numberOfUnits > count)
			{
				throw new HttpResponseException { Status = 400, Value = "Nincs elég egységed" };
			}
			else
			{
				var battle = await _context.Battles.Include(b=> b.AttackingUnits).FirstOrDefaultAsync(b => b.AttackingCountryID == attackingCountry.ID && b.DefendingCountryID == defendingCountry.ID);

				if (battle == null)
				{
					battle = new Battle
					{
						AttackingCountry = attackingCountry,
						DefendingCountry = defendingCountry,
						AttackingUnits = new List<AttackingUnit>(),
						Round = (await _context.Round.SingleOrDefaultAsync()).RoundNumber // ez az egész foe
					};
					battle.AttackingUnits.Add(new AttackingUnit { Count = numberOfUnits, UnitData = unitData });
					_context.Battles.Add(battle);

					await _context.SaveChangesAsync();

				}
				else
				{
					var unit = battle.AttackingUnits.SingleOrDefault(a => a.UnitDataID == unitDataId);
					if (unit == null)
					{
						battle.AttackingUnits.Add(new AttackingUnit { BattleID = battle.ID, Count = numberOfUnits, UnitDataID = unitData.ID });
					}
					else
					{
						unit.Count += numberOfUnits;
					}

				}

				
			}
		}

		public async Task<int> CalculateMaximumPotentialDefensePower(int countryID)
		{
			return await _context.Units.Include(u => u.UnitData).Where(u => u.CountryID == countryID).SumAsync(u => u.UnitData.DEF * u.Count);
		}


		public async Task SendExplorersToCountry(SendExplorationDTO explorationDTO)
		{
			if (explorationDTO.SenderCountryID == explorationDTO.VictimCountryID)
				throw new HttpResponseException { Status = 400, Value = "Ne bántsd magad :c" };

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
			var foundExplorers = await _context.Units.SingleOrDefaultAsync(u => u.CountryID == explorationDTO.SenderCountryID && u.UnitDataID == UnitData.Explorer.ID);
			if (foundExplorers != null) allExplorers = foundExplorers.Count;
			var exploring = await _context.Explorations.Where(e => e.SenderCountryID == explorationDTO.SenderCountryID).SumAsync(e => e.NumberOfExplorers);
			var availableExplorers = allExplorers - exploring;
			if (availableExplorers < explorationDTO.NumberOfExplorers) {
				throw new HttpResponseException { Status = 400, Value = "Nincs elég felfedező" };
			}
			var existingExp = await _context.Explorations.SingleOrDefaultAsync(e => e.SenderCountryID == explorationDTO.SenderCountryID && e.VictimCountryID == explorationDTO.VictimCountryID);
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

			await _context.SaveChangesAsync();
			
		}

		public async Task<List<ExplorationInfoDTO>> GetExplorationInfo(int countryId)
		{
			List<ExplorationInfoDTO> output = new List<ExplorationInfoDTO>();
			foreach(var expInfo in await _context.ExplorationInfos.Include(e=> e.ExposedCountry).Where(e=> e.InformedCountryID == countryId).ToListAsync())
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


		public async Task SimulateExploration(int explorationId)
		{
			double chance = 0.6;
			int round = (await _context.Round.SingleOrDefaultAsync()).RoundNumber;
			var exploration = await _context.Explorations.Include(e => e.VictimCountry).Include(e => e.SenderCountry).SingleOrDefaultAsync(e => e.ID == explorationId);
			var victimCountry = exploration.VictimCountry;
			var senderCountry = exploration.SenderCountry;
			var senderSpyCount = exploration.NumberOfExplorers;
			var victimSpyCount = (await _context.Units.SingleOrDefaultAsync(u=> u.CountryID == victimCountry.ID && u.UnitDataID == UnitData.Explorer.ID))?.Count - (await _context.Explorations.Where(e=> e.SenderCountryID == victimCountry.ID).SumAsync(e=> e.NumberOfExplorers));
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
					Round = round
				};

			if (spyProbability.Next(0, 100) <= chance * 100 || chance >= 1) //sikeres volt a kémkedés
			{
				var existingInfo = await _context.ExplorationInfos.SingleOrDefaultAsync(e => e.InformedCountryID == senderCountry.ID && e.ExposedCountryID == victimCountry.ID);
				explorationReport.Successful = true;
				explorationReport.ExposedDefensePower = await CalculateMaximumPotentialDefensePower(victimCountry.ID);
				
				if (existingInfo != null)
				{
					existingInfo.Round = round;
					existingInfo.LastKnownDefensePower = await CalculateMaximumPotentialDefensePower(victimCountry.ID);
				}
				else
				{
					var explorationInfo = new ExplorationInfo()
					{
						ExposedCountry = victimCountry,
						InformedCountry = senderCountry,
						LastKnownDefensePower = await  CalculateMaximumPotentialDefensePower(victimCountry.ID),
						Round = round
					};
					_context.ExplorationInfos.Add(explorationInfo);
				}
			}
			else    //sikertelen volt a kémkedés
			{
				explorationReport.Successful = false;
				(await _context.Units.SingleOrDefaultAsync(u => u.CountryID == senderCountry.ID && u.UnitDataID == UnitData.Explorer.ID)).Count -= exploration.NumberOfExplorers;
			}

			_context.ExplorationReports.Add(explorationReport);

			await _context.SaveChangesAsync();
		}

		public async Task CommenceBattle(int battleId)
		{


			var battle = await _context.Battles.Include(b => b.AttackingUnits).SingleOrDefaultAsync(b => b.ID == battleId);
			if (battle == null)
			{
				throw new HttpResponseException { Status = 400, Value = "Nincs ilyen csata" };
			}


			double multiplier = moraleGenerator.Next(0,2) >0 ? 1.05: 0.95; // bruh
			var ATKPower = await CountAttackPowerInBattle(battleId) * multiplier;
			var DEFPower = await CountDefensePowerInBattle(battleId);
			var defCountry = (await _context.Battles
				.Include(b=> b.DefendingCountry).ThenInclude(c=> c.Resources).ThenInclude(r=> r.ResourceData)
				.SingleOrDefaultAsync(b => b.ID == battleId)).DefendingCountry;

			var atkCountry = (await _context.Battles
				.Include(b=> b.AttackingCountry).ThenInclude(c => c.Resources).ThenInclude(r => r.ResourceData)
				.SingleOrDefaultAsync(b => b.ID == battleId)).AttackingCountry;

			var roundNumber = (await _context.Round.SingleOrDefaultAsync()).RoundNumber;

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

				foreach (int unitDataId in await _context.UnitData.Select(u => u.ID).ToListAsync())
				{
					int unitAtHomeLost = await CountUnitsOfTypeAtHome(defCountry.ID, unitDataId);
					if (unitAtHomeLost == 0) continue;
					unitAtHomeLost = (int)Math.Ceiling(unitAtHomeLost * 0.1);
					var unit = await _context.Units.Include(u => u.UnitData).SingleOrDefaultAsync(u => u.CountryID == defCountry.ID && u.UnitDataID == unitDataId);
					unit.Count -= unitAtHomeLost;
					lostUnits.Add(new LostUnit { LostAmount = unitAtHomeLost, UnitName = unit.UnitData.Name });
				}
				battleHistory.UnitsLost = lostUnits;

				var loot = new List<Loot>();

				foreach (int resourceDataId in await _context.ResourceData.Select(u => u.ID).ToListAsync())
				{
					var defenderResource = defCountry.Resources.SingleOrDefault(r=> r.ResourceDataID == resourceDataId);
					var resourceTaken = (int)Math.Ceiling(defenderResource.Amount * 0.5);
					defenderResource.Amount -= resourceTaken;
					atkCountry.Resources.SingleOrDefault(r => r.ResourceDataID == resourceDataId).Amount += resourceTaken;
					loot.Add(new Loot { ResourceName = defenderResource.ResourceData.Name, Amount = resourceTaken });
				}
				battleHistory.Loot = loot;

			}
			else
			{

				battleHistory.Succesful = false;

				var lostUnits = new List<LostUnit>();

				var allAttackingUnits = await _context.AttackingUnits.Include(a => a.Battle).Include(a => a.UnitData).Where(a => a.BattleID == battleId).ToListAsync();

				foreach (int unitDataId in await _context.UnitData.Select(u => u.ID).ToListAsync())
				{
					int unitAttackingLost = allAttackingUnits.Where(a => a.UnitData.ID == unitDataId).Select(a => a.Count).SingleOrDefault();
					if (unitAttackingLost == 0) continue;
					unitAttackingLost = (int)Math.Ceiling(unitAttackingLost * 0.1);
					var unit = await _context.Units.Include(u => u.UnitData).SingleOrDefaultAsync(u => u.CountryID == atkCountry.ID && u.UnitDataID == unitDataId);
					unit.Count -= unitAttackingLost;

					lostUnits.Add(new LostUnit { LostAmount = unitAttackingLost, UnitName = unit.UnitData.Name });
				}
				battleHistory.UnitsLost = lostUnits;

			}

			_context.BattleReports.Add(battleHistory);

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

		public async Task<List<ExplorationDetailsDTO>> GetCountryExplorations(int countryId)
		{
			List<ExplorationDetailsDTO> output = new List<ExplorationDetailsDTO>(); 
			foreach(var exploration in await _context.Explorations.Include(e=> e.VictimCountry).Where(e=> e.SenderCountryID== countryId).ToListAsync()){
				output.Add(new ExplorationDetailsDTO() { NumberOfExplorers = exploration.NumberOfExplorers, VictimCountryName = exploration.VictimCountry.Name });
			}
			return output;
		}

	}

}

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
    public class DataService : IDataService
    {
        private AppDbContext _context;

        public DataService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ResourceDTO>> GetCountryResourcesAsync(int countryId)
        {
            Country country = await _context.Countries.Include(c => c.Resources).ThenInclude(r => r.ResourceData).SingleOrDefaultAsync(c => c.ID == countryId);
            var output = new List<ResourceDTO>();


            foreach (var resource in country.Resources)
            {
                output.Add(new ResourceDTO()
                {
                    ResourceTypeID = resource.ResourceDataID,
                    Amount = resource.Amount,
                    Name = resource.ResourceData.Name,
                    Production = (int)Math.Floor(resource.ProductionBase * resource.ProductionMultiplier),
                    ImageURL = resource.ResourceData.ImageURL
                });
            }
            return output;

        }
        public async Task<List<UnitDTO>> GetCountryUnitsAsync(int countryId)
        {
            Country country = await _context.Countries.Include(c => c.Units).SingleOrDefaultAsync(c => c.ID == countryId);
            List<UnitDTO> output = new List<UnitDTO>();
            foreach (var unit in country.Units)
            {
                output.Add(new UnitDTO()
                {
                    Count = unit.Count,
                    UnitTypeID = unit.UnitDataID
                });
            }
            return output;
        }
        public async Task<List<UnitDetailsDTO>> GetUnitDetailsAsync()
        {
            List<UnitDetailsDTO> unitDetails = new List<UnitDetailsDTO>();
            var resourceTypes = await _context.ResourceData.ToListAsync();
            foreach (UnitData unitData in _context.UnitData)
            {
                unitDetails.Add(new UnitDetailsDTO()
                {
                    Name = unitData.Name,
                    ATK = unitData.ATK,
                    DEF = unitData.DEF,
                    UnitTypeID = unitData.ID,
                    Consumption = unitData.Consumption,
                    Salary = unitData.Salary,
                    Price = unitData.Price,
                    PriceTypeName = resourceTypes.SingleOrDefault(r => r.ID == unitData.PriceUnitID).Name,
                    ConsumptionTypeName = resourceTypes.SingleOrDefault(r => r.ID == unitData.ConsumptionUnitID).Name,
                    SalaryTypeName = resourceTypes.SingleOrDefault(r => r.ID == unitData.SalaryUnitID).Name,
                    ImageURL = unitData.ImageURL
                });
            }
            return unitDetails;
        }
        public async Task<List<UpgradeDTO>> GetCountryUpgradesAsync(int countryId)
        {
            Country country = await _context.Countries.Include(c => c.Upgrades).SingleOrDefaultAsync(c => c.ID == countryId);
            var output = new List<UpgradeDTO>();
            foreach (var upgrade in country.Upgrades)
            {
                output.Add(new UpgradeDTO() { Progress = upgrade.Progress, UpgradeTypeID = upgrade.UpgradeDataID });
            }
            return output;
        }
        public async Task<List<UpgradeDetailsDTO>> GetUpgradeDetails()
        {
            List<UpgradeDetailsDTO> upgradeDetails = new List<UpgradeDetailsDTO>();
            var upgradeDatas = await _context.UpgradeData.ToListAsync();

            foreach (UpgradeData upgradeData in upgradeDatas)
            {
                upgradeDetails.Add(new UpgradeDetailsDTO
                {
                    Effect = upgradeData.Effect,
                    Name = upgradeData.Name,
                    UpgradeTypeID = upgradeData.ID,
                    ImageURL = upgradeData.ImageURL

                });
            }
            return upgradeDetails;
        }
        public async Task<List<BuildingDTO>> GetCountryBuildingsAsync(int countryId)
        {
            Country country = await _context.Countries.Include(c => c.Buildings).SingleOrDefaultAsync(c => c.ID == countryId);
            var output = new List<BuildingDTO>();


            foreach (var building in country.Buildings)
            {
                output.Add(new BuildingDTO()
                {
                    BuildingTypeID = building.BuildingDataID,
                    Count = building.Count,
                    Progress = building.Progress
                });
            }
            return output;
        }
        public async Task<List<BuildingDetailsDTO>> GetBuildingDetailsAsync()
        {
            List<BuildingDetailsDTO> buildingDetails = new List<BuildingDetailsDTO>();
            var resourceTypes = await _context.ResourceData.ToListAsync();
            var buildingDatas = await _context.BuildingData.Include(b => b.Prices).ThenInclude(p => p.PriceUnit).ToListAsync();
            foreach (BuildingData buildingData in buildingDatas)
            {
                var pricelist = new List<PriceDTO>();
                pricelist.AddRange(buildingData.Prices.Select(p => new PriceDTO() { Price = p.Amount, PriceTypeName = p.PriceUnit.Name }));
                buildingDetails.Add(new BuildingDetailsDTO()
                {
                    BuildingTypeID = buildingData.ID,
                    BuildTime = buildingData.BuildTime,
                    Effect = buildingData.Effect,
                    Name = buildingData.Name,
                    Prices = pricelist,
                    ImageURL = buildingData.ImageURL
                });
                
            }
            return buildingDetails;
        }
        public async Task<List<RankDTO>> GetPlayerRanks()
        {
            var output = new List<RankDTO>();
            var countries = await _context.Countries.ToListAsync();
            foreach (var country in countries)
            {
                output.Add(new RankDTO { CountryID = country.ID, Name = country.Name, Score = country.Score });
            }
            output.Sort((x, y) => y.Score.CompareTo(x.Score));
            return output;
        }
        public async Task<CountryDetailsDTO> GetCountryDetailsAsync(int countryId)
        {
            Country country = await _context.Countries.SingleOrDefaultAsync(c => c.ID == countryId);
            return new CountryDetailsDTO()
            {
                ArmyCapacity = country.ArmyCapacity,
                ID = country.ID,
                Name = country.Name,
                Population = country.Population,
                Score = country.Score


            };
        }

        public FullReportDTO GetFullReport(int countryId)
        {

            var battleReports = new List<BattleReport>();
            var allBattleReports = _context.BattleReports.Include(b => b.Loot).Include(b => b.UnitsLost).Include(b => b.AttackerArmy)
                .Where(b => b.AttackerID == countryId || b.DefenderID == countryId);
            if (allBattleReports != null)
            {
                foreach (BattleReport battleReport in allBattleReports)
                {
                    var temp = new BattleReport
                    {
                        AttackerID = battleReport.AttackerID,
                        DefenderID = battleReport.DefenderID,
                        AttackerName = battleReport.AttackerName,
                        DefenderName = battleReport.DefenderName,
                        Succesful = battleReport.Succesful,
                        AttackerArmy = battleReport.AttackerArmy,
                        Loot = battleReport.Loot,
                        UnitsLost = battleReport.UnitsLost,
                        Round = battleReport.Round,
                        ATKPower = battleReport.ATKPower,
                        DEFPower = battleReport.DEFPower
                    };
                    foreach (var item in temp.AttackerArmy)
                    {
                        item.BattleReport = null;
                    }
                    battleReports.Add(temp);
                }
            }

            var explorationReports = new List<ExplorationReport>();
            var allExplorationReports = _context.ExplorationReports.Where(e => e.SenderCountryID == countryId);
            if (allExplorationReports != null)
            {
                foreach (ExplorationReport explorationReport in allExplorationReports)
                {
                    explorationReports.Add(new ExplorationReport
                    {
                        SenderCountryName = explorationReport.SenderCountryName,
                        VictimCountryName = explorationReport.VictimCountryName,
                        SenderCountryID = explorationReport.SenderCountryID,
                        VictimCountryID = explorationReport.VictimCountryID,
                        ExplorersSent = explorationReport.ExplorersSent,
                        Successful = explorationReport.Successful,
                        ExposedDefensePower = explorationReport.ExposedDefensePower
                    });

                }
            }

            return new FullReportDTO { BattleReports = battleReports, ExplorationReports = explorationReports };
        }

    }
}

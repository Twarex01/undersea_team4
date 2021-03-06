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
                    UnitCount = unit.Count,
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
                    ImageURL = buildingData.ImageURL,
                    IconURL = buildingData.IconURL,
                    BackgroundURL = buildingData.BackgroundURL
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
            for (int i = 0; i < output.Count; i++)
            {
                output[i].Rank = i + 1;
            }
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

        public async Task<FullReportDTO> GetFullReport(int countryId, int round)
        {
            var battleReports = await _context.BattleReports.Include(b => b.Loot).Include(b => b.UnitsLost).Include(b => b.AttackerArmy).Where(b =>( b.AttackerID == countryId || b.DefenderID == countryId) && b.Round == round ).ToListAsync();
            var explorationReports = await _context.ExplorationReports.Where(e => e.SenderCountryID == countryId && e.Round == round).ToListAsync();
            return new FullReportDTO { BattleReports = battleReports, ExplorationReports = explorationReports };
        }

    }
}

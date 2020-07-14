using Microsoft.EntityFrameworkCore;
using Namotion.Reflection;
using StrategyGame.Bll.DTO;
using StrategyGame.Bll.DTO.Country;
using StrategyGame.Dal;
using StrategyGame.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using System.Text;
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

        public CountryNameDTO QueryCountryName(int countryId)
        {

            var name = _context.Countries.Where(c => c.ID == countryId).Select(c => c.Name).FirstOrDefault();

            CountryNameDTO countryName = new CountryNameDTO(countryId, name);

            return countryName;
        }
        public List<Resource> QueryCountryResources(int countryId)
        {

            var resources = _context.Countries.Where(c => c.ID == countryId).Select(c => c.Resources).FirstOrDefault();

            return resources;
        }       
        
        public List<UnitDTO> QueryCountryUnits(int countryId)
        {
            var distinctUnitData = _context.UnitData.Distinct().ToList();
            List<UnitDTO> unitList = new List<UnitDTO>();

            foreach (UnitData u in distinctUnitData) 
            {
                var units = _context.Units.Include(u => u.Country).Include(u => u.UnitData).Where(u => u.CountryID == countryId).Select(x => new { x.ID, x.UnitData.Name, x.Count }).FirstOrDefault();
                UnitDTO unit = new UnitDTO(units.ID, units.Name, units.Count);
                unitList.Add(unit);
            }
            
            return unitList;
        }
    

        public CountryUpgradesDTO QueryCountryUpgrades(int countryId)
        {
            List<UpgradeDetailsDTO> upgradeDetailsDTO = new List<UpgradeDetailsDTO>();
            var upgrades = _context.Countries.Where(c => c.ID == countryId).Select(c => c.Upgrades).FirstOrDefault();

            foreach (Upgrade u in upgrades) 
            {

                var upData = _context.UpgradeData.Where(up => up.ID == u.ID).Select(x => new {x.Name}).FirstOrDefault();
                UpgradeDetailsDTO upgradeDetailDTO = new UpgradeDetailsDTO(u.ID, upData.Name, "TODO", u.Progress);
                upgradeDetailsDTO.Add(upgradeDetailDTO);
            
            
            }

            return new CountryUpgradesDTO(countryId, upgradeDetailsDTO);
        }

        public int QueryCountryScore(int countryId)
        {
            /*
            var populationscore = _context.Countries.Where(c => c.ID == countryId).Select(c => c.Population).FirstOrDefault();
            var buildingscore = _context.Countries.Where(c => c.ID == countryId).Sum(x => x.Buildings.Count);

            var distinctUnitDataIds = _context.Units.Select(u => u.UnitDataID).Distinct();
            var unitscore = 0;
            foreach (int unitDataId in distinctUnitDataIds) 
            {
                unitscore += _context.Units.Include(u => u.Country).Include(u => u.UnitData)
                    .Where(u => u.Country.ID == countryId && u.UnitDataID == unitDataId)
                    .Select(x => new { x.UnitData.PointValue, x.Count })
                    .Sum(x => x.PointValue * x.Count);
            }

            var upgradescore = _context.Upgrades.Include(c => c.Country).Where(u => u.ID == countryId && u.Progress == 0).Count();

            var score = 1*populationscore + 50*buildingscore + unitscore + 100*upgradescore;
            */

            var countryScore = _context.Countries.Where(c => c.ID == countryId).Select(c => c.Score).FirstOrDefault();

            return countryScore;
        }

        public List<UnitDetailsDTO> QueryUnitDetails()
        {
            var unitData = _context.UnitData.Distinct().ToList();
            List<UnitDetailsDTO> unitDetails = new List<UnitDetailsDTO>();

            foreach (UnitData ud in unitData) 
            {
                unitDetails.Add(new UnitDetailsDTO(ud.ATK, ud.DEF, ud.Salary, ud.Consumption, ud.Price););
            }

            return unitDetails;
        }

        public List<PlayerDTO> QueryCountryRank()
        {       
            List<PlayerDTO> rank = new List<PlayerDTO>();
            var distinctcountry = _context.Countries.Include(c => c.User).Distinct();
            foreach (Country c in distinctcountry)
            {
                var score = QueryCountryScore(c.ID);
                PlayerDTO tempPlayer = new PlayerDTO(Int32.Parse(c.UserID), c.User.UserName, score);
                rank.Add(tempPlayer);

            }
            rank.Sort((player1, player2) =>
            {
                return player1.Score.CompareTo(player2.Score);
            });

            return rank;
        }


    }
}

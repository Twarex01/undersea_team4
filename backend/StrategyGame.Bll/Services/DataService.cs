using Microsoft.EntityFrameworkCore;
using Namotion.Reflection;
using StrategyGame.Bll.DTO;
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

        public String QueryCountryName(int countryId)
        {

            var name = _context.Countries.Where(c => c.ID == countryId).Select(c => c.Name).FirstOrDefault();

            return name;
        }
        public List<Resource> QueryCountryResources(int countryId)
        {

            var resources = _context.Countries.Where(c => c.ID == countryId).Select(c => c.Resources).FirstOrDefault();

            return resources;
        }
        public List<Upgrade> QueryCountryUpgrades(int countryId)
        {

            var upgrades = _context.Countries.Where(c => c.ID == countryId).Select(c => c.Upgrades).FirstOrDefault();

            return upgrades;
        }

        public int QueryCountryScore(int countryId)
        {

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

            return score;
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

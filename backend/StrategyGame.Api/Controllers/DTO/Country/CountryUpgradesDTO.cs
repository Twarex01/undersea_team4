using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

namespace StrategyGame.Api.Controllers.DTO.Country
{
    public class CountryUpgradesDTO
    {
        public int Id { get; set; }
        public List<UpgradeDetailsDTO> Upgrades { get; set; }
    }
}

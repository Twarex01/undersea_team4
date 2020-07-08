using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Api.Controllers.DTO.Country
{
    public class CountryBuyUnitsDTO
    {
        public int Id { get; set; }
        public List<UnitDTO> Army { get; set; }
    }
}

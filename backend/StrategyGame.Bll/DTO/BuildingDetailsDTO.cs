using StrategyGame.Model;
using System.Collections.Generic;

namespace StrategyGame.Bll.DTO
{
    public class BuildingDetailsDTO
    {
        public int BuildingTypeID { get; set; }
        public string Name { get; set; }
        public List<PriceDTO> Prices { get; set; }
        public string Effect { get; set; }
        public int BuildTime { get; set; }
        public string ImageURL { get; set; }
    }
}

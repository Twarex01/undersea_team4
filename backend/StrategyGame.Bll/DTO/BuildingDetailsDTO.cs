using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Bll.DTO
{
    public class BuildingDetailsDTO
    {
        public int BuildingTypeID { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string PriceTypeName { get; set; }
        public string Effect { get; set; }
        public int BuildTime { get; set; }
    }
}

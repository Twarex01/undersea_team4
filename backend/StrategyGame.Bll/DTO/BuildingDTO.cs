using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Bll.DTO
{
    public class BuildingDTO 
    {
        public int BuildingTypeID { get; set; }
        public int Progress { get; set; }
        public int Count { get; set; }

    }
}

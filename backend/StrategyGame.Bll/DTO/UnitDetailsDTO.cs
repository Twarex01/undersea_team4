using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Bll.DTO
{
    public class UnitDetailsDTO
    {
      
        [Range(0, int.MaxValue)]
        public int Attack { get; set; }
        [Range(0, int.MaxValue)]
        public int Def { get; set; }
        [Range(0, int.MaxValue)]
        public int Pay { get; set; }
        [Range(0, int.MaxValue)]
        public int Supply { get; set; }
        [Range(0, int.MaxValue)]
        public int Price { get; set; }
    }
}

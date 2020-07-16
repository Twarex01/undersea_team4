using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Bll.DTO
{
    public class ResourceDTO
    {
        
        public int ResourceTypeID { get; set; }
        public int Amount { get; set; }
        public string Name { get; set; }
        public int Production { get; set; }

    }
}

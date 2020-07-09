using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Bll.DTO
{
    public class BuildingDetailsDTO: BuildingDTO
    {
        [StringLength(300, ErrorMessage = "{0} must be less than {1} characters!")]
        public string Effect { get; set; }
        [Range(0, int.MaxValue)]
        public int Price { get; set; }
    }
}

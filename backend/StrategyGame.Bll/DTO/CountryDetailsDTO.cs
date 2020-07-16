using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Bll.DTO
{
    public class CountryDetailsDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int  Score { get; set; }
        public int ArmyCapacity { get; set; }
        public int Population { get; set; }


    }
}

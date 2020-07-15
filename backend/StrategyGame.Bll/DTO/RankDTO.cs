using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Bll.DTO
{
    public class RankDTO
    {
        public int CountryID { get; set; }
        public string Name { get; set; }
        public int Score { get; set; }
    }


}

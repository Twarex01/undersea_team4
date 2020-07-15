using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

namespace StrategyGame.Bll.DTO
{
    public class UnitDTO
    {
        public int UnitTypeID { get; set; }
        public int Count { get; set; }
    }
}

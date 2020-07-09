using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Bll.DTO
{
    public class BattleDTO
    {
        public int IdAtt { get; set; }
        public int IdDef { get; set; }
        public List<UnitDTO> Army { get; set; }
    }
}

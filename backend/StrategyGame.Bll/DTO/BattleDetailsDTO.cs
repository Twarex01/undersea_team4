using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Bll.DTO
{
    public class BattleDetailsDTO  //mobilos kliensnek
    {
        public List<UnitWithName> Units { get; set; }
        public string DefenderName { get; set; }

    }
}

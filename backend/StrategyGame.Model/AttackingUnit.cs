using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public class AttackingUnit
    {
        public int ID { get; set; }

        public UnitData UnitData { get; set; }
        public int UnitDataID { get; set; }
        public int Count { get; set; }
    }
}

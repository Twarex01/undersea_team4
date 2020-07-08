using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public class ProductionEntry
    {
        public int CountryID { get; set; }

        public int ResourceID { get; set; }

        public int AmountPerRound { get; set; }
    }
}

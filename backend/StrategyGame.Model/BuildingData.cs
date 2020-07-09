using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public class BuildingData
    {
        public int ID { get; set; }

        public string Name { get; set; }
        public int Price { get; set; }
        public ResourceData PriceUnit { get; set; }
        public int PriceUnitID { get; set; }



    }
}

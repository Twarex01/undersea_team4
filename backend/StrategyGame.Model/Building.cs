using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public class Building
    {
        public int ID { get; set; }
        public int Count { get; set; }
        public int Progress { get; set; }

        public BuildingData BuildingData { get; set; }
        public int BuildingDataID { get; set; }
        public Country Country { get; set; }
        public int CoutryID { get; set; }
    }
}

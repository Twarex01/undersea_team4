using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public class Country
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public Upgrade CurrentlyUpgrading { get; set; }

        public int CurrentlyUpgradingID { get; set; }

        public Building CurrentlyBuilding { get; set; }

        public int CurrentlyBuildingID { get; set; }


        public int Population { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public class UpgradeData
    {
        public static UpgradeData Alchemy = new UpgradeData { ID = 1, Name = "Alkímia", UpgradeTime=15 };
        public static UpgradeData CoralWall = new UpgradeData { ID = 2, Name = "Korall fal", UpgradeTime = 15 };
        public static UpgradeData MartialArts = new UpgradeData { ID = 3, Name = "Vízalatti harcművészetek", UpgradeTime = 15 };
        public static UpgradeData MudHarvester = new UpgradeData { ID = 4, Name = "Iszap Kombájn", UpgradeTime = 15 };
        public static UpgradeData MudTractor = new UpgradeData { ID = 5, Name = "Iszap Traktor", UpgradeTime = 15 };
        public static UpgradeData SonarCannon = new UpgradeData { ID = 6, Name = "Szonár ágyú", UpgradeTime = 15 };
     
        public int ID { get; set; }
        public string Name { get; set; }
        public int UpgradeTime { get; set; }

    }
}

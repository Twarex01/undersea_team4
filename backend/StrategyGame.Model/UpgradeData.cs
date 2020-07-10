using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public class UpgradeData
    {
        public static UpgradeData Alchemy = new UpgradeData { ID = 1, Name = "Alkímia" };
        public static UpgradeData CoralWall = new UpgradeData { ID = 2, Name = "Korall fal" };
        public static UpgradeData MartialArts = new UpgradeData { ID = 3, Name = "Vízalatti harcművészetek" };
        public static UpgradeData MudHarvester = new UpgradeData { ID = 4, Name = "Iszap Kombájn" };
        public static UpgradeData MudTractor = new UpgradeData { ID = 5, Name = "Iszap Traktor" };
        public static UpgradeData SonarCannon = new UpgradeData { ID = 6, Name = "Szonár ágyú" };
        public int ID { get; set; }
        public string Name { get; set; }
        
    }
}

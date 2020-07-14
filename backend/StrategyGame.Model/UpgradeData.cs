using StrategyGame.Model.UpgradeTypes;
using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public abstract class UpgradeData
    {
        public static Alchemy Alchemy = new Alchemy { ID = 1, Name = "Alkímia", UpgradeTime=15 };
        public static CoralWall CoralWall = new CoralWall { ID = 2, Name = "Korall fal", UpgradeTime = 15 };
        public static MartialArts MartialArts = new MartialArts { ID = 3, Name = "Vízalatti harcművészetek", UpgradeTime = 15 };
        public static MudHarvester MudHarvester = new MudHarvester { ID = 4, Name = "Iszap Kombájn", UpgradeTime = 15 };
        public static MudTractor MudTractor = new MudTractor { ID = 5, Name = "Iszap Traktor", UpgradeTime = 15 };
        public static SonarCannon SonarCannon = new SonarCannon { ID = 6, Name = "Szonár ágyú", UpgradeTime = 15 };
     
        public int ID { get; set; }
        public string Name { get; set; }
        public int UpgradeTime { get; set; }

        public abstract void ApplyEffects(Country country);
        
        

        

    }
}

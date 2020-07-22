using StrategyGame.Model.BuildingTypes;
using System.Collections.Generic;
using System.Data;

namespace StrategyGame.Model
{
    public abstract class BuildingData
    {

        public static FlowRegulator FlowRegulator = new FlowRegulator { 
            ID = 1,
            Name = "Áramlásirányító",
            BuildTime = 5,
            Effect = "50 lakost ad a népességhez és 200 korallt termel körönként",
            ImageURL = "/Assets/Buildings/flowregulator.png"
        };

        public static ReefFort ReefFort = new ReefFort { ID = 2,
            Name = "Zátonyvár",
            BuildTime = 5,
            Effect = "200 egység katonának nyújt szállást",
            ImageURL = "/Assets/Buildings/reeffort.png"
        };

        public static StoneMine StoneMine = new StoneMine { 
            ID = 3,
            Name = "Kőbánya",
            BuildTime = 5,
            Effect = "Körönként 25 kővel gazdagítja a játékost", 
            ImageURL = "/Assets/Buildings/stonemine_icon.png"

        };
        public int ID { get; set; }
        public string Name { get; set; }
        public List<Price> Prices { get; set; }
        public int BuildTime { get; set; }
        public string Effect { get; set; }
        public string ImageURL { get; set; }
        public abstract void ApplyEffect(Country country);




    }
}

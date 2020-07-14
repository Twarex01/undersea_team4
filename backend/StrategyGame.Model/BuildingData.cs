using StrategyGame.Model.BuildingTypes;
using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public abstract class BuildingData
    {

        public static FlowRegulator FlowRegulator = new FlowRegulator { ID = 1, Name = "Áramlásirányító", Price = 1000, PriceUnitID = ResourceData.Pearl.ID, BuildTime = 5 };
        public static ReefFort ReefFort = new ReefFort { ID = 2, Name = "Zátonyvár", Price = 1000, PriceUnitID = ResourceData.Pearl.ID, BuildTime = 5 };
        public int ID { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public ResourceData PriceUnit { get; set; }
        public int PriceUnitID { get; set; }
        public int BuildTime { get; set; }

        public abstract void ApplyEffect(Country country);
        



    }
}

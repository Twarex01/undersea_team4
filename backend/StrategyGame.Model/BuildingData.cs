using StrategyGame.Model.BuildingTypes;

namespace StrategyGame.Model
{
    public abstract class BuildingData
    {

        public static FlowRegulator FlowRegulator = new FlowRegulator { ID = 1, Name = "Áramlásirányító", Price = 1000, PriceUnitID = ResourceData.Pearl.ID, BuildTime = 5, Effect = "50 lakost ad a népességhez és 200 korallt termel körönként" };
        public static ReefFort ReefFort = new ReefFort { ID = 2, Name = "Zátonyvár", Price = 1000, PriceUnitID = ResourceData.Pearl.ID, BuildTime = 5, Effect = "200 egység katonának nyújt szállást" };
        public int ID { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public ResourceData PriceUnit { get; set; }
        public int PriceUnitID { get; set; }
        public int BuildTime { get; set; }
        public string Effect { get; set; }
        public string ImageURL { get; set; }
        public abstract void ApplyEffect(Country country);




    }
}

using StrategyGame.Model.BuildingTypes;
using System.Data;

namespace StrategyGame.Model
{
    public abstract class BuildingData
    {

        public static FlowRegulator FlowRegulator = new FlowRegulator { ID = 1, Name = "Áramlásirányító", Price = 1000, PriceUnitID = ResourceData.Pearl.ID, BuildTime = 5, Effect = "50 lakost ad a népességhez és 200 korallt termel körönként", 
            ImageURL = "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3Ae4a8d9ef-dcca-4b53-addd-0e9ec6b1ca39&params=version%3A0&token=1595286086_fac29e2b_58e760f6d8b9aa02eda4f5c868eded6278ccce9b&api_key=CometServer1"};
        public static ReefFort ReefFort = new ReefFort { ID = 2, Name = "Zátonyvár", Price = 1000, PriceUnitID = ResourceData.Pearl.ID, BuildTime = 5, Effect = "200 egység katonának nyújt szállást",
            ImageURL = "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3Addde0d54-f997-446a-b0b1-14a6b27b3a2c&params=version%3A0&token=1595286086_fac29e2b_58e760f6d8b9aa02eda4f5c868eded6278ccce9b&api_key=CometServer1"};
        public static StoneMine StoneMine = new StoneMine { ID = 3, Name = "Kőbánya", Price = 1000, PriceUnitID = ResourceData.Pearl.ID, BuildTime = 5, Effect = "Körönként 25 kővel gazdagítja a játékost" 
            ImageURL = ""};
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

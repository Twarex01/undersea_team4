namespace StrategyGame.Model
{
    public class ResourceData
    {
        public static ResourceData Coral = new ResourceData { ID = 1, Name = "Korall", 
            ImageURL = "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3Ab0dfd1d9-b7e9-4c19-aca4-a06b36fa415b&params=version%3A0&token=1595286086_fac29e2b_58e760f6d8b9aa02eda4f5c868eded6278ccce9b&api_key=CometServer1"
        };
        public static ResourceData Pearl = new ResourceData { ID = 2, Name = "Gyöngy", 
            ImageURL = "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3A2767b629-5fa0-46a8-a9bb-d7a3f7bf0054&params=version%3A0&token=1595286086_fac29e2b_58e760f6d8b9aa02eda4f5c868eded6278ccce9b&api_key=CometServer1"
        };
        public static ResourceData Stone = new ResourceData
        {
            ID = 3, Name = "Kő",
            ImageURL = ""
        };

        public static int TaxAmount = 25; // azért csak egy szám mert a játék működése szempontjából nem lenne értelmes a gyöngytől különböző erőforrást adózni
        public static int BasePopulation = 10;
        public static int BaseCoralProduction = 20;

        public int ID { get; set; }
        public string Name { get; set; }
        public string ImageURL { get; set; }
    }
}

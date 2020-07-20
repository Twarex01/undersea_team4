namespace StrategyGame.Model
{
    public class UnitData
    {
        public static UnitData AssaultSeal = new UnitData
        {
            ID = 1,
            Name = "Roham Fóka",
            Salary = 1,
            SalaryUnitID = ResourceData.Pearl.ID,
            Price = 50,
            PriceUnitID = ResourceData.Pearl.ID,
            Consumption = 1,
            ConsumptionUnitID = ResourceData.Coral.ID,
            ATK = 6,
            DEF = 2,
            PointValue = 5,
            ImageURL = "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3A782a7431-630e-4149-b9cb-6130e5f8cbee&params=version%3A1&token=1595286086_fac29e2b_58e760f6d8b9aa02eda4f5c868eded6278ccce9b&api_key=CometServer1"
        };

        public static UnitData BattleSeaHorse = new UnitData
        {
            ID = 2,
            Name = "Csata Csikó",
            Salary = 1,
            SalaryUnitID = ResourceData.Pearl.ID,
            Price = 50,
            PriceUnitID = ResourceData.Pearl.ID,
            Consumption = 1,
            ConsumptionUnitID = ResourceData.Coral.ID,
            ATK = 2,
            DEF = 6,
            PointValue = 5,
            ImageURL = "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3A239bcebd-c8e3-4590-95af-3248182c4bc8&params=version%3A1&token=1595286086_fac29e2b_58e760f6d8b9aa02eda4f5c868eded6278ccce9b&api_key=CometServer1"
        };

        public static UnitData LaserShark = new UnitData
        {
            ID = 3,
            Name = "Lézer Cápa",
            Salary = 3,
            SalaryUnitID = ResourceData.Pearl.ID,
            Price = 100,
            PriceUnitID = ResourceData.Pearl.ID,
            Consumption = 2,
            ConsumptionUnitID = ResourceData.Coral.ID,
            ATK = 5,
            DEF = 5,
            PointValue = 10,
            ImageURL = "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3Aa2557965-c21f-4fc5-a489-66bdf366178d&params=version%3A0&token=1595286086_fac29e2b_58e760f6d8b9aa02eda4f5c868eded6278ccce9b&api_key=CometServer1"
        };

        public int ID { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public ResourceData PriceUnit { get; set; }
        public int? PriceUnitID { get; set; }
        public int ATK { get; set; }
        public int DEF { get; set; }
        public int Salary { get; set; }
        public ResourceData SalaryUnit { get; set; }
        public int? SalaryUnitID { get; set; }
        public int Consumption { get; set; }
        public ResourceData ConsumptionUnit { get; set; }
        public int? ConsumptionUnitID { get; set; }
        public int PointValue { get; set; }
        public string ImageURL { get; set; }

    }
}

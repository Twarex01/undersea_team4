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
            ImageURL = "Assets/Units/seal.png"
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
            ImageURL = "Assets/Units/seahorse.png"
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
            ImageURL = "Assets/Units/shark.png"
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

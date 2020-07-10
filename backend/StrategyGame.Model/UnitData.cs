using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public class UnitData
    {
        public static UnitData AssaultSeal = new UnitData { 
            ID = 1, Name = "Roham Fóka",
            Salary = 1,
            SalaryUnit = ResourceData.Pearl,
            Price = 50,
            PriceUnit = ResourceData.Pearl,
            Consumption = 1,
            ConsumptionUnit = ResourceData.Coral ,
            ATK = 6,
            DEF=2
        };

        public static UnitData BattleSeaHorse = new UnitData
        {
            ID = 2,
            Name = "Csata Csikó",
            Salary = 1,
            SalaryUnit = ResourceData.Pearl,
            Price = 50,
            PriceUnit = ResourceData.Pearl,
            Consumption = 1,
            ConsumptionUnit = ResourceData.Coral,
            ATK = 2,
            DEF = 6
        };

        public static UnitData LaserShark = new UnitData
        {
            ID = 3,
            Name = "Lézer Cápa",
            Salary = 3,
            SalaryUnit = ResourceData.Pearl,
            Price = 100,
            PriceUnit = ResourceData.Pearl,
            Consumption = 2,
            ConsumptionUnit = ResourceData.Coral,
            ATK = 5,
            DEF = 5
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

    }
}

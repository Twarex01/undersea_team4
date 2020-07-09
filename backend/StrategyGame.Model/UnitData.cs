using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public class UnitData
    {
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

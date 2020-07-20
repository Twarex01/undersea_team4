namespace StrategyGame.Bll.DTO
{
    public class UnitDetailsDTO
    {
        public string Name { get; set; }
        public int UnitTypeID { get; set; }
        public int ATK { get; set; }
        public int DEF { get; set; }
        public int Salary { get; set; }
        public int Consumption { get; set; }
        public int Price { get; set; }
        public string PriceTypeName { get; set; }
        public string SalaryTypeName { get; set; }
        public string ConsumptionTypeName { get; set; }
    }
}

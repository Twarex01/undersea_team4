namespace StrategyGame.Model
{
	public class Unit
	{
		public int ID { get; set; }

		public UnitData UnitData { get; set; }

		public int UnitDataID { get; set; }

		public int Count { get; set; }
		public Country Country { get; set; }
		public int CountryID { get; set; }
	}
}

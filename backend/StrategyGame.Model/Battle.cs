using System.Collections.Generic;

namespace StrategyGame.Model
{
	public class Battle
	{
		public int ID { get; set; }

		public int Round { get; set; }

		public Country AttackingCountry { get; set; }
		public Country DefendingCountry { get; set; }

		public int? AttackingCountryID { get; set; }
		public int? DefendingCountryID { get; set; }

		public List<AttackingUnit> AttackingUnits { get; set; }
	}
}

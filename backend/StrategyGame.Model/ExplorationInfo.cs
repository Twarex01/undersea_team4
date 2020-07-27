using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
	public class ExplorationInfo
	{
		public int Round { get; set; }
		public int ID { get; set; }
		public int? InformedCountryID { get; set; }
		public Country InformedCountry { get; set; }
		public int? ExposedCountryID { get; set; }
		public Country ExposedCountry { get; set; }
		public int LastKnownDefensePower { get; set; }
	}
}

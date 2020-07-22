using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
	public class Exploration
	{
		public int ID { get; set; }
		public int? SenderCountryID { get; set; }
		public Country SenderCountry { get; set; }
		public int? VictimCountryID { get; set; }
		public Country VictimCountry { get; set; }
		public int NumberOfExplorers { get; set; }
	}
}

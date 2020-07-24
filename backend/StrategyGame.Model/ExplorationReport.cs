using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
	public class ExplorationReport
	{
		public int ID { get; set; }
		public string SenderCountryName { get; set; }
		public string VictimCountryName { get; set; }
		public int SenderCountryID { get; set; }
		public int VictimCountryID { get; set; }
		public int ExplorersSent { get; set; }
		public bool Successful { get; set; }
		public int ExposedDefensePower { get; set; }
		public int Round { get; set; }
	}
}

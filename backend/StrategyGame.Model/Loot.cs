using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
	public class Loot
	{
		public int ID { get; set; }
		public string ResourceName { get; set; }
		public int Amount { get; set; }
		public BattleReport BattleReport { get; set; }
		public int BattleReportID { get; set; }
	}
}

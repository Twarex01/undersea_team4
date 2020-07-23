using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
	public class LostUnit
	{
		public int ID { get; set; }
		public string UnitName { get; set; }
		public int LostAmount { get; set; }
		public BattleReport BattleReport { get; set; }
		public int BattleReportID { get; set; }
	}
}

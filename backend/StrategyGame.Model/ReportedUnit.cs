using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
	public class ReportedUnit
	{
		public int ID { get; set; }
		public BattleReport BattleReport { get; set; }
		public int BattleReportID { get; set; }
		public string Name { get; set; }
		public int Count { get; set; }
	}
}

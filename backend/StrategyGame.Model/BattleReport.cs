using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
	public class BattleReport
	{
		public int ID { get; set; }
		public int AttackerID { get; set; }
		public int DefenderID { get; set; }
		public string AttackerName { get; set; }
		public string DefenderName { get; set; }
		public bool Succesful { get; set; }
		public List<ReportedUnit> AttackerArmy { get; set; }
		public List<Loot> Loot { get; set; }
		public List<LostUnit> UnitsLost { get; set; }
		public int Round { get; set; }
		public int ATKPower { get; set; }
		public int DEFPower { get; set; }
	}
}

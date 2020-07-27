using StrategyGame.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Bll.DTO
{
	public class FullReportDTO
	{
		public List<BattleReport> BattleReports { get; set; }

		public List<ExplorationReport> ExplorationReports { get; set; }

	}
}

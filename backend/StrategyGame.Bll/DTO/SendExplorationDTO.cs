using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Bll.DTO
{
	public class SendExplorationDTO
	{
		public int SenderCountryID { get; set; }
		public int VictimCountryID { get; set; }
		public int NumberOfExplorers { get; set; }
	}
}

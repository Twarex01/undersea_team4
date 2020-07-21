using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
	public class Price
	{
		public int ID { get; set; }
		public int Amount { get; set; }
		public ResourceData PriceUnit { get; set; }
		public int PriceUnitID { get; set; }
		public BuildingData Building { get; set; }
		public int BuildingID { get; set; }
	}
}

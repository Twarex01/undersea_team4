using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StrategyGame.Model.BuildingTypes
{
    public class StoneMine : BuildingData
    {
        public override void ApplyEffect(Country country)
        {
            var stoneProd = country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Stone.ID);
            if (stoneProd == null) return;
            stoneProd.ProductionBase += 25;
        }
    }
}

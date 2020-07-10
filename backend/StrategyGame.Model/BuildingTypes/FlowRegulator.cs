using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StrategyGame.Model.BuildingTypes
{
    public class FlowRegulator : Building
    {
        public override void ApplyEffect()
        {
            Country.Population += 50;
            var coralProd = Country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Coral.ID);
            if (coralProd == null) return; //bruh
            coralProd.ProductionBase += 200;
               
        }
    }
}

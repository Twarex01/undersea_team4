using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StrategyGame.Model
{
    public class ReefFort : Building
    {
        public override void ApplyEffect()
        {
            Country.ArmyCapacity += 200; //+200 army capacity, price = 1000 gyöngy
            var coralProd = Country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Coral.ID);
            if (coralProd == null) return; //bruh
            coralProd.ProductionBase += 200*ResourceData.TaxAmount; 
        }
    }
}

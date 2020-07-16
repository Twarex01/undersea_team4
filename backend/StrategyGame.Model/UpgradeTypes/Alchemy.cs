using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StrategyGame.Model.UpgradeTypes
{
    public class Alchemy : UpgradeData
    {
        public override void ApplyEffects(Country country)
        {
            //+30% gyöngy/kör
            var pearlProd = country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Pearl.ID);
            if (pearlProd == null) return;
            pearlProd.ProductionMultiplier += 0.3;
        }
    }
}

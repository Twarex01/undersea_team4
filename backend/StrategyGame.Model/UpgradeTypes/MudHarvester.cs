using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StrategyGame.Model.UpgradeTypes
{
    public class MudHarvester : Upgrade
    {
        public override void ApplyEffects()
        {
            var coralProd = Country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Coral.ID);// +15% koral/round
            if (coralProd == null) return;
            coralProd.ProductionMultiplier += 0.15;
        }
    }
}

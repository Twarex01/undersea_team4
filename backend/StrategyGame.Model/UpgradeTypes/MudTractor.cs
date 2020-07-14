﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StrategyGame.Model.UpgradeTypes
{
    public class MudTractor : UpgradeData
    {
        public override void ApplyEffects(Country country)
        {
            var coralProd = country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Coral.ID);// +15% koral/round
            if (coralProd == null) return;
            coralProd.ProductionMultiplier += 0.1;
        }
    }
}

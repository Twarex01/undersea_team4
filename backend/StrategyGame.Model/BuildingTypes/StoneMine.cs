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
            var coralProd = country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Stone.ID);
            if (coralProd == null) return;
            coralProd.ProductionBase += 25;
            // növeli a kőtermelést 25-el
        }
    }
}

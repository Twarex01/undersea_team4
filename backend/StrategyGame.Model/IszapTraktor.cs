using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StrategyGame.Model
{
    public class IszapTraktor : Upgrade
    {
        public override void applyEffects()
        {
           var countryProds = Productions.Instance.ProductionEntries.Where(p => p.CountryID == this.CoutryID);
            
        }
    }
}

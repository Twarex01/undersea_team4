using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model.UpgradeTypes
{
    public class CoralWall : Upgrade
    {
        public override void ApplyEffects()
        {
            // +20% defense modifier

            Country.DefenseModifier += 0.2;
        }
    }
}

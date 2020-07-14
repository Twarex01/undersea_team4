using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model.UpgradeTypes
{
    public class CoralWall : UpgradeData
    {
        public override void ApplyEffects(Country country)
        {
            // +20% defense modifier

            country.DefenseModifier += 0.2;
        }
    }
}

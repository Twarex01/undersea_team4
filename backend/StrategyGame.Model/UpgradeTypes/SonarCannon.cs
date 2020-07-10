using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model.UpgradeTypes
{
    public class SonarCannon : Upgrade
    {
        public override void ApplyEffects()
        {
            Country.AttackModifier += 0.2; // +20% attack modifier
        }
    }
}

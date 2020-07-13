using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model.UpgradeTypes
{
    public class MartialArts : Upgrade
    {
        public override void ApplyEffects()
        {
            Country.AttackModifier += 0.1;
            Country.DefenseModifier += 0.1;
            //+10% attack modifier, +10% defense modifier
        }
    }
}

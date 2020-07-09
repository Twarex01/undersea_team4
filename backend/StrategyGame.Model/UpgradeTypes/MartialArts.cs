using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model.UpgradeTypes
{
    public class MartialArts : Upgrade
    {
        public override void ApplyEffects()
        {
            throw new NotImplementedException(); //+10% attack modifier, +10% defense modifier
        }
    }
}

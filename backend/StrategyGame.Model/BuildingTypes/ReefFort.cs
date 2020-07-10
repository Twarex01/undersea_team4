using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public class ReefFort : Building
    {
        public override void ApplyEffect()
        {
            Country.ArmyCapacity += 200; //+200 army capacity, price = 1000 gyöngy
        }
    }
}

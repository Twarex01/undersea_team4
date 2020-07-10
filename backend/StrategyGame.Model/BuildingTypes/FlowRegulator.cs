using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model.BuildingTypes
{
    public class FlowRegulator : Building
    {
        public override void ApplyEffect()
        {
            Country.Population += 50; //+50 pupulation +200 koral/round price = 1000 gyöngy
        }
    }
}

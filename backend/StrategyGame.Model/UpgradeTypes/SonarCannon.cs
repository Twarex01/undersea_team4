﻿namespace StrategyGame.Model.UpgradeTypes
{
    public class SonarCannon : UpgradeData
    {
        public override void ApplyEffects(Country country)
        {
            country.AttackModifier += 0.2; // +20% attack modifier
        }
    }
}

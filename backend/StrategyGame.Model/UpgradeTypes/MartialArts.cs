namespace StrategyGame.Model.UpgradeTypes
{
    public class MartialArts : UpgradeData
    {
        public override void ApplyEffects(Country country)
        {
            country.AttackModifier += 0.1;
            country.DefenseModifier += 0.1;
            //+10% attack modifier, +10% defense modifier
        }
    }
}

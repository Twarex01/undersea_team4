using System.Linq;

namespace StrategyGame.Model.UpgradeTypes
{
    public class MudHarvester : UpgradeData
    {
        public override void ApplyEffects(Country country)
        {
            var coralProd = country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Coral.ID);// +15% koral/round
            if (coralProd == null) return;
            coralProd.ProductionMultiplier += 0.15;
        }
    }
}

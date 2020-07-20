using System.Linq;

namespace StrategyGame.Model.UpgradeTypes
{
    public class Alchemy : UpgradeData
    {
        public override void ApplyEffects(Country country)
        {
            //+30% gyöngy/kör
            var pearlProd = country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Pearl.ID);
            if (pearlProd == null) return;
            pearlProd.ProductionMultiplier += 0.3;
        }
    }
}

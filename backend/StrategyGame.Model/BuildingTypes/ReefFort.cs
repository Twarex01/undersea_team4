using System.Linq;

namespace StrategyGame.Model
{
    public class ReefFort : BuildingData
    {
        public override void ApplyEffect(Country country)
        {
            country.ArmyCapacity += 200; //+200 army capacity, price = 1000 gyöngy
            var coralProd = country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Coral.ID);
            if (coralProd == null) return; //bruh
            coralProd.ProductionBase += 200 * ResourceData.TaxAmount;
        }
    }
}

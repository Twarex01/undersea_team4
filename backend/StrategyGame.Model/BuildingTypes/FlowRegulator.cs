using System.Linq;

namespace StrategyGame.Model.BuildingTypes
{
    public class FlowRegulator : BuildingData
    {
        public override void ApplyEffect(Country country)
        {
            country.Population += 50;
            var pearlProd = country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Pearl.ID);
            if (pearlProd == null) return;
            pearlProd.ProductionBase += 25 * 50;

            var coralProd = country.Resources.SingleOrDefault(r => r.ResourceDataID == ResourceData.Coral.ID);
            if (coralProd == null) return;
            coralProd.ProductionBase += 200;

        }
    }
}

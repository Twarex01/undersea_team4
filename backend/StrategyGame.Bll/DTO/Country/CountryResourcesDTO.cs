using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Bll.DTO.Country
{
    public class CountryResourcesDTO
    {
        public List<UnitDTO> Army { get; set; }
        public List<ResourceDTO> Products { get; set; }
        [Range(0, int.MaxValue)]
        public int Population { get; set; }
        [Range(0, int.MaxValue)]
        public int ArmyCapacity { get; set; }
        public List<BuildingDTO> Buildings { get; set; }

    }
}

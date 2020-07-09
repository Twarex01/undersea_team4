using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Api.Controllers.DTO
{
    public class ResourceDTO
    {
        public int Id { get; set; }
        [Range(0, int.MaxValue)]
        public int Count { get; set; }
        public int Output { get; set; }
    }
}

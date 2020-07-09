using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Bll.DTO.Country
{
    public class CountryNameDTO
    {
        public int Id { get; set; }
        [StringLength(100, ErrorMessage = "{0} must be less than {1} characters!")]
        public string Name { get; set; }
    }
}

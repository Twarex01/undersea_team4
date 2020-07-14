﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

namespace StrategyGame.Bll.DTO
{
    public class UnitDTO : UnitDetailsDTO
    {
        
        public int Id { get; set; }
        [StringLength(100, ErrorMessage = "{0} must be less than {1} characters!")]
        public string Name { get; set; }
        [Range(0, int.MaxValue)]
        public int Count { get; set; }
    }
}

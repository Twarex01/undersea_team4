﻿using System.Collections.Generic;

namespace StrategyGame.Bll.DTO
{
    public class BattleDTO
    {
        public int IdAtt { get; set; }
        public int IdDef { get; set; }
        public List<UnitDTO> Army { get; set; } = new List<UnitDTO>();
    }
}

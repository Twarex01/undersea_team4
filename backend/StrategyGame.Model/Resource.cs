﻿using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public class Resource
    {
        public int ID { get; set; }
        public int Amount { get; set; }
        public ResourceData ResourceData {get; set;}
        public int ResourceDataID { get; set; }
        public Country Country { get; set; }
        public int CoutryID { get; set; }
        public int ProductionBase { get; set; }
        public int ProductionMultiplier { get; set; } = 1;
    }
}

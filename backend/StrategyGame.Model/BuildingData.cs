﻿using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public class BuildingData
    {

        public static BuildingData FlowRequlator = new BuildingData { ID = 1, Name = "Áramlásirányító", Price = 1000, PriceUnitID = ResourceData.Pearl.ID };
        public static BuildingData RiftFort = new BuildingData { ID = 2, Name = "Zátonyvár", Price = 1000, PriceUnitID = ResourceData.Pearl.ID };
        public int ID { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public ResourceData PriceUnit { get; set; }
        public int PriceUnitID { get; set; }



    }
}
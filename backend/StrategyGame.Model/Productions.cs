using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public class Productions

    {
        private static Productions instance;

        public static Productions Instance
        {
            get {
                if (Instance != null) return instance;
                else return new Productions();         
            }
            
        }


        private Productions()
        {
            ProductionEntries = new List<ProductionEntry>();
        }
        public List<ProductionEntry> ProductionEntries { get; set; }

       
    }
}

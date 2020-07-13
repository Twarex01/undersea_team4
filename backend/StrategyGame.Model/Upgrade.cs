using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public abstract class Upgrade 
    {
        public int ID { get; set; }
        public int Progress { get; set; }

        public UpgradeData UpgradeData { get; set; }
        public int UpgradeDataID { get; set; }
        public Country Country { get; set; }
        public int CoutryID { get; set; }
        public abstract void ApplyEffects();
    }
}

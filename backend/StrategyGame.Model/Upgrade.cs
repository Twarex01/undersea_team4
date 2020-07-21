namespace StrategyGame.Model
{
    public class Upgrade
    {
        public int ID { get; set; }
        public int Progress { get; set; }

        public UpgradeData UpgradeData { get; set; }
        public int UpgradeDataID { get; set; }
        public Country Country { get; set; }
        public int CoutryID { get; set; }

    }
}

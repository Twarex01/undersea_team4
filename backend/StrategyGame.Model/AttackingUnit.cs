namespace StrategyGame.Model
{
    public class AttackingUnit
    {
        public int ID { get; set; }

        public Battle Battle { get; set; }

        public int BattleID { get; set; }
        public UnitData UnitData { get; set; }
        public int UnitDataID { get; set; }
        public int Count { get; set; }
    }
}

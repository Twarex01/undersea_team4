using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public class Country
    {
        public Country()
        {
          
            Resources = new List<Resource>();
            Buildings = new List<Building>();
            Upgrades = new List<Upgrade>();
            Population = 50;
            ArmyCapacity = 100;

        }

        public int ID { get; set; }
        public string Name { get; set; }
        public User User { get; set; }
        public string UserID { get; set; }
        public List<Resource> Resources { get; set; }
        public List<Building> Buildings { get; set; }
        public List<Upgrade> Upgrades { get; set; }
        public List<Unit> Units { get; set; }
        public int Population { get; set; }
        public int ArmyCapacity { get; set; }
        public int AttackModifier { get; set; } = 1;
        public int DefenseModifier { get; set; } = 1;

    }
}

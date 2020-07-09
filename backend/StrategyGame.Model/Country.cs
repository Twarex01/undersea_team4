using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public class Country
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public User User { get; set; }

        public string UserID { get; set; }

        public List<Resource> Resources { get; set; }
        public List<Building> Buildings { get; set; }
        public List<Upgrade> Upgrades { get; set; }

        public List<Unit> Units { get; set; }


        public int Population { get; set; }

    }
}

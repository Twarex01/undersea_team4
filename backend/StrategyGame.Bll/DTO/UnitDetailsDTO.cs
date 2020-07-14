using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Bll.DTO
{
    public class UnitDetailsDTO: UnitDTO
    {
        public UnitDetailsDTO(int id, string name, int count, int attack, int def, int pay, int supply, int price) : base(id, name, count)
        {
            Attack = attack;
            Def = def;
            Pay = pay;
            Supply = supply;
            Price = price;
        }


        [Range(0, int.MaxValue)]
        public int Attack { get; set; }
        [Range(0, int.MaxValue)]
        public int Def { get; set; }
        [Range(0, int.MaxValue)]
        public int Pay { get; set; }
        [Range(0, int.MaxValue)]
        public int Supply { get; set; }
        [Range(0, int.MaxValue)]
        public int Price { get; set; }
    }
}

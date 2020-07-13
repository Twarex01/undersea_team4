using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Bll.DTO
{
    public class PlayerDTO
    {
        public PlayerDTO(int id, string name, int score)
        {
            Id = id;
            Name = name;
            Score = score;
        }

        public int Id { get; set; }
        [StringLength(100, ErrorMessage = "{0} must be less than {1} characters!")]
        public string Name { get; set; }
        [Range(0, int.MaxValue)]
        public int Score { get; set; }
    }


}

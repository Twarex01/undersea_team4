using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Bll.DTO
{
    public class RoundScoreDTO
    {
        public RoundScoreDTO(int id, int round, int score, int rank)
        {
            Id = id;
            Round = round;
            Score = score;
            Rank = rank;
        }

        public int Id { get; set; }
        [Range(0, int.MaxValue)]
        public int Round { get; set; }
        [Range(0, int.MaxValue)]
        public int  Score { get; set; }
        [Range(0, int.MaxValue)]
        public int Rank { get; set; }
    }
}

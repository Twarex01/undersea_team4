using System.ComponentModel.DataAnnotations;

namespace StrategyGame.Bll.DTO.common
{
    public class LoginDTO
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }

    }
}

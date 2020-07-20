using System.ComponentModel.DataAnnotations;

namespace StrategyGame.Bll.DTO.common
{
    public class RegisterDTO
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string PasswordConfirmation { get; set; }
        [Required]
        public string CountryName { get; set; }
    }
}

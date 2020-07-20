using Microsoft.AspNetCore.Identity;

namespace StrategyGame.Model
{
    public class User : IdentityUser
    {
        public Country Country { get; set; }
    }
}

using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public class User : IdentityUser
    {
        public Country Country { get; set; }

        public int CountryID { get; set; }
    }
}

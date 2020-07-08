using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using StrategyGame.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace StrategyGame.Dal
{
    public class AppDbContext : IdentityDbContext
    {
        

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
    }
}

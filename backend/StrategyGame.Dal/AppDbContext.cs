using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using StrategyGame.Model;

namespace StrategyGame.Dal
{
    public class AppDbContext : DbContext
    {
        public DbSet<Entity> MyProperty { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
    }
}

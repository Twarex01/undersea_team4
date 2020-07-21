using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StrategyGame.Model;
using StrategyGame.Model.BuildingTypes;
using StrategyGame.Model.UpgradeTypes;


namespace StrategyGame.Dal
{
	public class AppDbContext : IdentityDbContext<User>
	{
		public DbSet<Country> Countries { get; set; }
		public DbSet<Building> Buildings { get; set; }
		public DbSet<Resource> Resources { get; set; }
		public DbSet<Upgrade> Upgrades { get; set; }
		public DbSet<Unit> Units { get; set; }
		public DbSet<BuildingData> BuildingData { get; set; }
		public DbSet<UpgradeData> UpgradeData { get; set; }
		public DbSet<UnitData> UnitData { get; set; }
		public DbSet<ResourceData> ResourceData { get; set; }
		public DbSet<Battle> Battles { get; set; }
		public DbSet<AttackingUnit> AttackingUnits { get; set; }
		public DbSet<Price> Prices { get; set; }

		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{


		}

		protected override void OnModelCreating(ModelBuilder builder)
		{

			base.OnModelCreating(builder);

			builder.Entity<MudTractor>().HasBaseType<UpgradeData>();
			builder.Entity<MudHarvester>().HasBaseType<UpgradeData>();
			builder.Entity<CoralWall>().HasBaseType<UpgradeData>();
			builder.Entity<Alchemy>().HasBaseType<UpgradeData>();
			builder.Entity<SonarCannon>().HasBaseType<UpgradeData>();
			builder.Entity<MartialArts>().HasBaseType<UpgradeData>();

			builder.Entity<ReefFort>().HasBaseType<BuildingData>();
			builder.Entity<FlowRegulator>().HasBaseType<BuildingData>();
			builder.Entity<StoneMine>().HasBaseType<BuildingData>();

			builder.Entity<User>().HasOne(u => u.Country).WithOne(c => c.User).HasForeignKey<Country>(c => c.UserID);

			builder.Entity<Country>().HasKey(c => c.ID);

			builder.Entity<Resource>().HasKey(r => r.ID);
			builder.Entity<Resource>().HasOne(r => r.Country).WithMany(c => c.Resources).HasForeignKey(r => r.CoutryID);
			builder.Entity<Resource>().HasOne(r => r.ResourceData).WithMany().HasForeignKey(r => r.ResourceDataID);

			builder.Entity<Building>().HasKey(b => b.ID);
			builder.Entity<Building>().HasOne(b => b.Country).WithMany(c => c.Buildings).HasForeignKey(b => b.CoutryID);
			builder.Entity<Building>().HasOne(b => b.BuildingData).WithMany().HasForeignKey(r => r.BuildingDataID);

			builder.Entity<Upgrade>().HasKey(u => u.ID);
			builder.Entity<Upgrade>().HasOne(u => u.Country).WithMany(c => c.Upgrades).HasForeignKey(u => u.CoutryID);
			builder.Entity<Upgrade>().HasOne(u => u.UpgradeData).WithMany().HasForeignKey(u => u.UpgradeDataID);

			builder.Entity<Unit>().HasKey(u => u.ID);
			builder.Entity<Unit>().HasOne(u => u.Country).WithMany(c => c.Units).HasForeignKey(u => u.CountryID);
			builder.Entity<Unit>().HasOne(u => u.UnitData).WithMany().HasForeignKey(u => u.UnitDataID);
			builder.Entity<Unit>().Property(u => u.Count);

			builder.Entity<ResourceData>().HasKey(r => r.ID);

			builder.Entity<UnitData>().HasKey(u => u.ID);
			builder.Entity<UnitData>().HasOne(u => u.ConsumptionUnit).WithMany().HasForeignKey(u => u.ConsumptionUnitID);
			builder.Entity<UnitData>().HasOne(u => u.PriceUnit).WithMany().HasForeignKey(u => u.PriceUnitID);
			builder.Entity<UnitData>().HasOne(u => u.SalaryUnit).WithMany().HasForeignKey(u => u.SalaryUnitID);

			builder.Entity<BuildingData>().HasKey(b => b.ID);
			builder.Entity<BuildingData>().HasMany(b => b.Prices).WithOne().HasForeignKey(p => p.BuildingID);

			builder.Entity<Price>().HasKey(p => p.ID);
			builder.Entity<Price>().HasOne(p => p.PriceUnit).WithMany().HasForeignKey(p => p.PriceUnitID);

			builder.Entity<UpgradeData>().HasKey(u => u.ID);

			builder.Entity<Battle>().HasKey(b => b.ID);
			builder.Entity<Battle>().HasOne(b => b.DefendingCountry).WithMany().HasForeignKey(b => b.DefendingCountryID);
			builder.Entity<Battle>().HasOne(b => b.AttackingCountry).WithMany().HasForeignKey(b => b.AttackingCountryID);

			builder.Entity<AttackingUnit>().HasKey(a => a.ID);
			builder.Entity<AttackingUnit>().HasOne(a => a.Battle).WithMany(b => b.AttackingUnits).HasForeignKey(a => a.BattleID);
			builder.Entity<AttackingUnit>().HasOne(a => a.UnitData).WithMany().HasForeignKey(a => a.UnitDataID);

			builder.Entity<ResourceData>().HasData(new ResourceData[] { StrategyGame.Model.ResourceData.Pearl, StrategyGame.Model.ResourceData.Coral, StrategyGame.Model.ResourceData.Stone });

			builder.Entity<Price>().HasData(new Price[]
			{
				new Price() { ID =1, PriceUnitID = StrategyGame.Model.ResourceData.Stone.ID, Amount = 50, BuildingID = StrategyGame.Model.BuildingData.FlowRegulator.ID  },
				new Price() { ID =2, PriceUnitID = StrategyGame.Model.ResourceData.Pearl.ID, Amount = 1000, BuildingID = StrategyGame.Model.BuildingData.FlowRegulator.ID },

				new Price() { ID =3, PriceUnitID = StrategyGame.Model.ResourceData.Stone.ID, Amount = 50, BuildingID = StrategyGame.Model.BuildingData.ReefFort.ID  },
				new Price() { ID =4, PriceUnitID = StrategyGame.Model.ResourceData.Pearl.ID, Amount = 1000, BuildingID = StrategyGame.Model.BuildingData.ReefFort.ID },

				new Price() { ID =5, PriceUnitID = StrategyGame.Model.ResourceData.Pearl.ID, Amount = 1000, BuildingID = StrategyGame.Model.BuildingData.StoneMine.ID },
			});

			builder.Entity<FlowRegulator>().HasData(StrategyGame.Model.BuildingData.FlowRegulator);
			builder.Entity<ReefFort>().HasData(StrategyGame.Model.BuildingData.ReefFort);
			builder.Entity<StoneMine>().HasData(StrategyGame.Model.BuildingData.StoneMine);

			builder.Entity<Alchemy>().HasData(StrategyGame.Model.UpgradeData.Alchemy);
			builder.Entity<CoralWall>().HasData(StrategyGame.Model.UpgradeData.CoralWall);
			builder.Entity<MartialArts>().HasData(StrategyGame.Model.UpgradeData.MartialArts);
			builder.Entity<MudHarvester>().HasData(StrategyGame.Model.UpgradeData.MudHarvester);
			builder.Entity<MudTractor>().HasData(StrategyGame.Model.UpgradeData.MudTractor);
			builder.Entity<SonarCannon>().HasData(StrategyGame.Model.UpgradeData.SonarCannon);

			builder.Entity<UnitData>().HasData(new UnitData[] { StrategyGame.Model.UnitData.AssaultSeal, StrategyGame.Model.UnitData.BattleSeaHorse, StrategyGame.Model.UnitData.LaserShark });
		  


		}
	}
}

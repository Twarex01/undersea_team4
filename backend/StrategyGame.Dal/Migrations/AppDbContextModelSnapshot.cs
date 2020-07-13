﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using StrategyGame.Dal;

namespace StrategyGame.Dal.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("StrategyGame.Model.AttackingUnit", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BattleID")
                        .HasColumnType("int");

                    b.Property<int>("Count")
                        .HasColumnType("int");

                    b.Property<int>("UnitDataID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("BattleID");

                    b.HasIndex("UnitDataID")
                        .IsUnique();

                    b.ToTable("AttackingUnits");
                });

            modelBuilder.Entity("StrategyGame.Model.Battle", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AttackingCountryID")
                        .HasColumnType("int");

                    b.Property<int?>("DefendingCountryID")
                        .HasColumnType("int");

                    b.Property<int>("Round")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("AttackingCountryID")
                        .IsUnique()
                        .HasFilter("[AttackingCountryID] IS NOT NULL");

                    b.HasIndex("DefendingCountryID")
                        .IsUnique()
                        .HasFilter("[DefendingCountryID] IS NOT NULL");

                    b.ToTable("Battles");
                });

            modelBuilder.Entity("StrategyGame.Model.Building", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BuildingDataID")
                        .HasColumnType("int");

                    b.Property<int>("Count")
                        .HasColumnType("int");

                    b.Property<int>("CoutryID")
                        .HasColumnType("int");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Progress")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("BuildingDataID");

                    b.HasIndex("CoutryID");

                    b.ToTable("Buildings");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Building");
                });

            modelBuilder.Entity("StrategyGame.Model.BuildingData", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BuildTime")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.Property<int>("PriceUnitID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("PriceUnitID");

                    b.ToTable("BuildingData");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            BuildTime = 5,
                            Name = "Áramlásirányító",
                            Price = 1000,
                            PriceUnitID = 2
                        },
                        new
                        {
                            ID = 2,
                            BuildTime = 5,
                            Name = "Zátonyvár",
                            Price = 1000,
                            PriceUnitID = 2
                        });
                });

            modelBuilder.Entity("StrategyGame.Model.Country", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ArmyCapacity")
                        .HasColumnType("int");

                    b.Property<double>("AttackModifier")
                        .HasColumnType("float");

                    b.Property<double>("DefenseModifier")
                        .HasColumnType("float");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Population")
                        .HasColumnType("int");

                    b.Property<int>("Score")
                        .HasColumnType("int");

                    b.Property<string>("UserID")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("ID");

                    b.HasIndex("UserID")
                        .IsUnique()
                        .HasFilter("[UserID] IS NOT NULL");

                    b.ToTable("Countries");
                });

            modelBuilder.Entity("StrategyGame.Model.Resource", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<int>("CoutryID")
                        .HasColumnType("int");

                    b.Property<int>("ProductionBase")
                        .HasColumnType("int");

                    b.Property<double>("ProductionMultiplier")
                        .HasColumnType("float");

                    b.Property<int>("ResourceDataID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("CoutryID");

                    b.HasIndex("ResourceDataID");

                    b.ToTable("Resources");
                });

            modelBuilder.Entity("StrategyGame.Model.ResourceData", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("ResourceData");

                    b.HasData(
                        new
                        {
                            ID = 2,
                            Name = "Gyöngy"
                        },
                        new
                        {
                            ID = 1,
                            Name = "Korall"
                        });
                });

            modelBuilder.Entity("StrategyGame.Model.Unit", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Count")
                        .HasColumnType("int");

                    b.Property<int>("CountryID")
                        .HasColumnType("int");

                    b.Property<int>("UnitDataID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("CountryID");

                    b.HasIndex("UnitDataID");

                    b.ToTable("Units");
                });

            modelBuilder.Entity("StrategyGame.Model.UnitData", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ATK")
                        .HasColumnType("int");

                    b.Property<int>("Consumption")
                        .HasColumnType("int");

                    b.Property<int?>("ConsumptionUnitID")
                        .HasColumnType("int");

                    b.Property<int>("DEF")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PointValue")
                        .HasColumnType("int");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.Property<int?>("PriceUnitID")
                        .HasColumnType("int");

                    b.Property<int>("Salary")
                        .HasColumnType("int");

                    b.Property<int?>("SalaryUnitID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("ConsumptionUnitID");

                    b.HasIndex("PriceUnitID");

                    b.HasIndex("SalaryUnitID");

                    b.ToTable("UnitData");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            ATK = 6,
                            Consumption = 1,
                            ConsumptionUnitID = 1,
                            DEF = 2,
                            Name = "Roham Fóka",
                            PointValue = 5,
                            Price = 50,
                            PriceUnitID = 2,
                            Salary = 1,
                            SalaryUnitID = 2
                        },
                        new
                        {
                            ID = 2,
                            ATK = 2,
                            Consumption = 1,
                            ConsumptionUnitID = 1,
                            DEF = 6,
                            Name = "Csata Csikó",
                            PointValue = 5,
                            Price = 50,
                            PriceUnitID = 2,
                            Salary = 1,
                            SalaryUnitID = 2
                        },
                        new
                        {
                            ID = 3,
                            ATK = 5,
                            Consumption = 2,
                            ConsumptionUnitID = 1,
                            DEF = 5,
                            Name = "Lézer Cápa",
                            PointValue = 10,
                            Price = 100,
                            PriceUnitID = 2,
                            Salary = 3,
                            SalaryUnitID = 2
                        });
                });

            modelBuilder.Entity("StrategyGame.Model.Upgrade", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CoutryID")
                        .HasColumnType("int");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Progress")
                        .HasColumnType("int");

                    b.Property<int>("UpgradeDataID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("CoutryID");

                    b.HasIndex("UpgradeDataID");

                    b.ToTable("Upgrades");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Upgrade");
                });

            modelBuilder.Entity("StrategyGame.Model.UpgradeData", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UpgradeTime")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("UpgradeData");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            Name = "Alkímia",
                            UpgradeTime = 15
                        },
                        new
                        {
                            ID = 2,
                            Name = "Korall fal",
                            UpgradeTime = 15
                        },
                        new
                        {
                            ID = 3,
                            Name = "Vízalatti harcművészetek",
                            UpgradeTime = 15
                        },
                        new
                        {
                            ID = 4,
                            Name = "Iszap Kombájn",
                            UpgradeTime = 15
                        },
                        new
                        {
                            ID = 5,
                            Name = "Iszap Traktor",
                            UpgradeTime = 15
                        },
                        new
                        {
                            ID = 6,
                            Name = "Szonár ágyú",
                            UpgradeTime = 15
                        });
                });

            modelBuilder.Entity("StrategyGame.Model.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("StrategyGame.Model.BuildingTypes.FlowRegulator", b =>
                {
                    b.HasBaseType("StrategyGame.Model.Building");

                    b.HasDiscriminator().HasValue("FlowRegulator");
                });

            modelBuilder.Entity("StrategyGame.Model.ReefFort", b =>
                {
                    b.HasBaseType("StrategyGame.Model.Building");

                    b.HasDiscriminator().HasValue("ReefFort");
                });

            modelBuilder.Entity("StrategyGame.Model.UpgradeTypes.Alchemy", b =>
                {
                    b.HasBaseType("StrategyGame.Model.Upgrade");

                    b.HasDiscriminator().HasValue("Alchemy");
                });

            modelBuilder.Entity("StrategyGame.Model.UpgradeTypes.CoralWall", b =>
                {
                    b.HasBaseType("StrategyGame.Model.Upgrade");

                    b.HasDiscriminator().HasValue("CoralWall");
                });

            modelBuilder.Entity("StrategyGame.Model.UpgradeTypes.MartialArts", b =>
                {
                    b.HasBaseType("StrategyGame.Model.Upgrade");

                    b.HasDiscriminator().HasValue("MartialArts");
                });

            modelBuilder.Entity("StrategyGame.Model.UpgradeTypes.MudHarvester", b =>
                {
                    b.HasBaseType("StrategyGame.Model.Upgrade");

                    b.HasDiscriminator().HasValue("MudHarvester");
                });

            modelBuilder.Entity("StrategyGame.Model.UpgradeTypes.MudTractor", b =>
                {
                    b.HasBaseType("StrategyGame.Model.Upgrade");

                    b.HasDiscriminator().HasValue("MudTractor");
                });

            modelBuilder.Entity("StrategyGame.Model.UpgradeTypes.SonarCannon", b =>
                {
                    b.HasBaseType("StrategyGame.Model.Upgrade");

                    b.HasDiscriminator().HasValue("SonarCannon");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("StrategyGame.Model.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("StrategyGame.Model.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("StrategyGame.Model.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("StrategyGame.Model.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("StrategyGame.Model.AttackingUnit", b =>
                {
                    b.HasOne("StrategyGame.Model.Battle", "Battle")
                        .WithMany("AttackingUnits")
                        .HasForeignKey("BattleID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("StrategyGame.Model.UnitData", "UnitData")
                        .WithOne()
                        .HasForeignKey("StrategyGame.Model.AttackingUnit", "UnitDataID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("StrategyGame.Model.Battle", b =>
                {
                    b.HasOne("StrategyGame.Model.Country", "AttackingCountry")
                        .WithOne()
                        .HasForeignKey("StrategyGame.Model.Battle", "AttackingCountryID");

                    b.HasOne("StrategyGame.Model.Country", "DefendingCountry")
                        .WithOne()
                        .HasForeignKey("StrategyGame.Model.Battle", "DefendingCountryID");
                });

            modelBuilder.Entity("StrategyGame.Model.Building", b =>
                {
                    b.HasOne("StrategyGame.Model.BuildingData", "BuildingData")
                        .WithMany()
                        .HasForeignKey("BuildingDataID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("StrategyGame.Model.Country", "Country")
                        .WithMany("Buildings")
                        .HasForeignKey("CoutryID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("StrategyGame.Model.BuildingData", b =>
                {
                    b.HasOne("StrategyGame.Model.ResourceData", "PriceUnit")
                        .WithMany()
                        .HasForeignKey("PriceUnitID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("StrategyGame.Model.Country", b =>
                {
                    b.HasOne("StrategyGame.Model.User", "User")
                        .WithOne("Country")
                        .HasForeignKey("StrategyGame.Model.Country", "UserID");
                });

            modelBuilder.Entity("StrategyGame.Model.Resource", b =>
                {
                    b.HasOne("StrategyGame.Model.Country", "Country")
                        .WithMany("Resources")
                        .HasForeignKey("CoutryID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("StrategyGame.Model.ResourceData", "ResourceData")
                        .WithMany()
                        .HasForeignKey("ResourceDataID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("StrategyGame.Model.Unit", b =>
                {
                    b.HasOne("StrategyGame.Model.Country", "Country")
                        .WithMany("Units")
                        .HasForeignKey("CountryID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("StrategyGame.Model.UnitData", "UnitData")
                        .WithMany()
                        .HasForeignKey("UnitDataID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("StrategyGame.Model.UnitData", b =>
                {
                    b.HasOne("StrategyGame.Model.ResourceData", "ConsumptionUnit")
                        .WithMany()
                        .HasForeignKey("ConsumptionUnitID");

                    b.HasOne("StrategyGame.Model.ResourceData", "PriceUnit")
                        .WithMany()
                        .HasForeignKey("PriceUnitID");

                    b.HasOne("StrategyGame.Model.ResourceData", "SalaryUnit")
                        .WithMany()
                        .HasForeignKey("SalaryUnitID");
                });

            modelBuilder.Entity("StrategyGame.Model.Upgrade", b =>
                {
                    b.HasOne("StrategyGame.Model.Country", "Country")
                        .WithMany("Upgrades")
                        .HasForeignKey("CoutryID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("StrategyGame.Model.UpgradeData", "UpgradeData")
                        .WithMany()
                        .HasForeignKey("UpgradeDataID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace StrategyGame.Dal.Migrations
{
    public partial class EntitiesAdded_NoBattle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CountryID",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "BuildingData",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuildingData", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    UserID = table.Column<string>(nullable: true),
                    Population = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Countries_AspNetUsers_UserID",
                        column: x => x.UserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ResourceData",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResourceData", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "UnitData",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<int>(nullable: false),
                    ATK = table.Column<int>(nullable: false),
                    DEF = table.Column<int>(nullable: false),
                    Salary = table.Column<int>(nullable: false),
                    Consumption = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnitData", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "UpgradeData",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UpgradeData", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Buildings",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Count = table.Column<int>(nullable: false),
                    Progress = table.Column<int>(nullable: false),
                    BuildingDataID = table.Column<int>(nullable: false),
                    CoutryID = table.Column<int>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Buildings", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Buildings_BuildingData_BuildingDataID",
                        column: x => x.BuildingDataID,
                        principalTable: "BuildingData",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Buildings_Countries_CoutryID",
                        column: x => x.CoutryID,
                        principalTable: "Countries",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Resources",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Count = table.Column<int>(nullable: false),
                    ResourceDataID = table.Column<int>(nullable: false),
                    CoutryID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resources", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Resources_Countries_CoutryID",
                        column: x => x.CoutryID,
                        principalTable: "Countries",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Resources_ResourceData_ResourceDataID",
                        column: x => x.ResourceDataID,
                        principalTable: "ResourceData",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Units",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UnitDataID = table.Column<int>(nullable: false),
                    Count = table.Column<int>(nullable: false),
                    CoutryID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Units", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Units_Countries_CoutryID",
                        column: x => x.CoutryID,
                        principalTable: "Countries",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Units_UnitData_UnitDataID",
                        column: x => x.UnitDataID,
                        principalTable: "UnitData",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Upgrades",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Progress = table.Column<int>(nullable: false),
                    UpgradeDataID = table.Column<int>(nullable: false),
                    CoutryID = table.Column<int>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Upgrades", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Upgrades_Countries_CoutryID",
                        column: x => x.CoutryID,
                        principalTable: "Countries",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Upgrades_UpgradeData_UpgradeDataID",
                        column: x => x.UpgradeDataID,
                        principalTable: "UpgradeData",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Buildings_BuildingDataID",
                table: "Buildings",
                column: "BuildingDataID");

            migrationBuilder.CreateIndex(
                name: "IX_Buildings_CoutryID",
                table: "Buildings",
                column: "CoutryID");

            migrationBuilder.CreateIndex(
                name: "IX_Countries_UserID",
                table: "Countries",
                column: "UserID",
                unique: true,
                filter: "[UserID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Resources_CoutryID",
                table: "Resources",
                column: "CoutryID");

            migrationBuilder.CreateIndex(
                name: "IX_Resources_ResourceDataID",
                table: "Resources",
                column: "ResourceDataID");

            migrationBuilder.CreateIndex(
                name: "IX_Units_CoutryID",
                table: "Units",
                column: "CoutryID");

            migrationBuilder.CreateIndex(
                name: "IX_Units_UnitDataID",
                table: "Units",
                column: "UnitDataID");

            migrationBuilder.CreateIndex(
                name: "IX_Upgrades_CoutryID",
                table: "Upgrades",
                column: "CoutryID");

            migrationBuilder.CreateIndex(
                name: "IX_Upgrades_UpgradeDataID",
                table: "Upgrades",
                column: "UpgradeDataID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Buildings");

            migrationBuilder.DropTable(
                name: "Resources");

            migrationBuilder.DropTable(
                name: "Units");

            migrationBuilder.DropTable(
                name: "Upgrades");

            migrationBuilder.DropTable(
                name: "BuildingData");

            migrationBuilder.DropTable(
                name: "ResourceData");

            migrationBuilder.DropTable(
                name: "UnitData");

            migrationBuilder.DropTable(
                name: "Countries");

            migrationBuilder.DropTable(
                name: "UpgradeData");

            migrationBuilder.DropColumn(
                name: "CountryID",
                table: "AspNetUsers");
        }
    }
}

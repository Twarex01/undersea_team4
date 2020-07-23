using Microsoft.EntityFrameworkCore.Migrations;

namespace StrategyGame.Dal.Migrations
{
    public partial class Undersea_v8_CR3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BattleReports",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AttackerID = table.Column<int>(nullable: false),
                    DefenderID = table.Column<int>(nullable: false),
                    AttackerName = table.Column<string>(nullable: true),
                    DefenderName = table.Column<string>(nullable: true),
                    Succesful = table.Column<bool>(nullable: false),
                    Round = table.Column<int>(nullable: false),
                    ATKPower = table.Column<int>(nullable: false),
                    DEFPower = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BattleReports", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ExplorationReports",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SenderCountryName = table.Column<string>(nullable: true),
                    VictimCountryName = table.Column<string>(nullable: true),
                    SenderCountryID = table.Column<int>(nullable: false),
                    VictimCountryID = table.Column<int>(nullable: false),
                    ExplorersSent = table.Column<int>(nullable: false),
                    Successful = table.Column<bool>(nullable: false),
                    ExposedDefensePower = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExplorationReports", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Loot",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceName = table.Column<string>(nullable: true),
                    Amount = table.Column<int>(nullable: false),
                    BattleReportID1 = table.Column<int>(nullable: true),
                    BattleReportID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Loot", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Loot_BattleReports_BattleReportID",
                        column: x => x.BattleReportID,
                        principalTable: "BattleReports",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Loot_BattleReports_BattleReportID1",
                        column: x => x.BattleReportID1,
                        principalTable: "BattleReports",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LostUnit",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UnitName = table.Column<string>(nullable: true),
                    LostAmount = table.Column<int>(nullable: false),
                    BattleReportID1 = table.Column<int>(nullable: true),
                    BattleReportID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LostUnit", x => x.ID);
                    table.ForeignKey(
                        name: "FK_LostUnit_BattleReports_BattleReportID",
                        column: x => x.BattleReportID,
                        principalTable: "BattleReports",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LostUnit_BattleReports_BattleReportID1",
                        column: x => x.BattleReportID1,
                        principalTable: "BattleReports",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ReportedUnit",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BattleReportID1 = table.Column<int>(nullable: true),
                    BattleReportID = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Count = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportedUnit", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ReportedUnit_BattleReports_BattleReportID",
                        column: x => x.BattleReportID,
                        principalTable: "BattleReports",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReportedUnit_BattleReports_BattleReportID1",
                        column: x => x.BattleReportID1,
                        principalTable: "BattleReports",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 1,
                column: "ImageURL",
                value: "/Assets/Units/seal.png");

            migrationBuilder.CreateIndex(
                name: "IX_Loot_BattleReportID",
                table: "Loot",
                column: "BattleReportID");

            migrationBuilder.CreateIndex(
                name: "IX_Loot_BattleReportID1",
                table: "Loot",
                column: "BattleReportID1");

            migrationBuilder.CreateIndex(
                name: "IX_LostUnit_BattleReportID",
                table: "LostUnit",
                column: "BattleReportID");

            migrationBuilder.CreateIndex(
                name: "IX_LostUnit_BattleReportID1",
                table: "LostUnit",
                column: "BattleReportID1");

            migrationBuilder.CreateIndex(
                name: "IX_ReportedUnit_BattleReportID",
                table: "ReportedUnit",
                column: "BattleReportID");

            migrationBuilder.CreateIndex(
                name: "IX_ReportedUnit_BattleReportID1",
                table: "ReportedUnit",
                column: "BattleReportID1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExplorationReports");

            migrationBuilder.DropTable(
                name: "Loot");

            migrationBuilder.DropTable(
                name: "LostUnit");

            migrationBuilder.DropTable(
                name: "ReportedUnit");

            migrationBuilder.DropTable(
                name: "BattleReports");

            migrationBuilder.UpdateData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 1,
                column: "ImageURL",
                value: "Assets/Units/seal.png");
        }
    }
}

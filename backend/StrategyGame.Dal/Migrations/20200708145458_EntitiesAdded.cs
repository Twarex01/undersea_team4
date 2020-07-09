using Microsoft.EntityFrameworkCore.Migrations;

namespace StrategyGame.Dal.Migrations
{
    public partial class EntitiesAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Battles",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Round = table.Column<int>(nullable: false),
                    AttackingCountryID = table.Column<int>(nullable: true),
                    DefendingCountryID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Battles", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Battles_Countries_AttackingCountryID",
                        column: x => x.AttackingCountryID,
                        principalTable: "Countries",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Battles_Countries_DefendingCountryID",
                        column: x => x.DefendingCountryID,
                        principalTable: "Countries",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AttackingUnits",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BattleID = table.Column<int>(nullable: false),
                    UnitDataID = table.Column<int>(nullable: false),
                    Count = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttackingUnits", x => x.ID);
                    table.ForeignKey(
                        name: "FK_AttackingUnits_Battles_BattleID",
                        column: x => x.BattleID,
                        principalTable: "Battles",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AttackingUnits_UnitData_UnitDataID",
                        column: x => x.UnitDataID,
                        principalTable: "UnitData",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AttackingUnits_BattleID",
                table: "AttackingUnits",
                column: "BattleID");

            migrationBuilder.CreateIndex(
                name: "IX_AttackingUnits_UnitDataID",
                table: "AttackingUnits",
                column: "UnitDataID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Battles_AttackingCountryID",
                table: "Battles",
                column: "AttackingCountryID",
                unique: true,
                filter: "[AttackingCountryID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Battles_DefendingCountryID",
                table: "Battles",
                column: "DefendingCountryID",
                unique: true,
                filter: "[DefendingCountryID] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AttackingUnits");

            migrationBuilder.DropTable(
                name: "Battles");
        }
    }
}

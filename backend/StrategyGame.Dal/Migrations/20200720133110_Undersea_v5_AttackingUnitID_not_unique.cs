using Microsoft.EntityFrameworkCore.Migrations;

namespace StrategyGame.Dal.Migrations
{
    public partial class Undersea_v5_AttackingUnitID_not_unique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AttackingUnits_UnitDataID",
                table: "AttackingUnits");

            migrationBuilder.CreateIndex(
                name: "IX_AttackingUnits_UnitDataID",
                table: "AttackingUnits",
                column: "UnitDataID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AttackingUnits_UnitDataID",
                table: "AttackingUnits");

            migrationBuilder.CreateIndex(
                name: "IX_AttackingUnits_UnitDataID",
                table: "AttackingUnits",
                column: "UnitDataID",
                unique: true);
        }
    }
}

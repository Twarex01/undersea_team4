using Microsoft.EntityFrameworkCore.Migrations;

namespace StrategyGame.Dal.Migrations
{
    public partial class Undersea_v8_1_CR3_fix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Loot_BattleReports_BattleReportID",
                table: "Loot");

            migrationBuilder.DropForeignKey(
                name: "FK_Loot_BattleReports_BattleReportID1",
                table: "Loot");

            migrationBuilder.DropForeignKey(
                name: "FK_LostUnit_BattleReports_BattleReportID",
                table: "LostUnit");

            migrationBuilder.DropForeignKey(
                name: "FK_LostUnit_BattleReports_BattleReportID1",
                table: "LostUnit");

            migrationBuilder.DropForeignKey(
                name: "FK_ReportedUnit_BattleReports_BattleReportID",
                table: "ReportedUnit");

            migrationBuilder.DropForeignKey(
                name: "FK_ReportedUnit_BattleReports_BattleReportID1",
                table: "ReportedUnit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReportedUnit",
                table: "ReportedUnit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LostUnit",
                table: "LostUnit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Loot",
                table: "Loot");

            migrationBuilder.RenameTable(
                name: "ReportedUnit",
                newName: "ReportedUnits");

            migrationBuilder.RenameTable(
                name: "LostUnit",
                newName: "LostUnits");

            migrationBuilder.RenameTable(
                name: "Loot",
                newName: "Loots");

            migrationBuilder.RenameIndex(
                name: "IX_ReportedUnit_BattleReportID1",
                table: "ReportedUnits",
                newName: "IX_ReportedUnits_BattleReportID1");

            migrationBuilder.RenameIndex(
                name: "IX_ReportedUnit_BattleReportID",
                table: "ReportedUnits",
                newName: "IX_ReportedUnits_BattleReportID");

            migrationBuilder.RenameIndex(
                name: "IX_LostUnit_BattleReportID1",
                table: "LostUnits",
                newName: "IX_LostUnits_BattleReportID1");

            migrationBuilder.RenameIndex(
                name: "IX_LostUnit_BattleReportID",
                table: "LostUnits",
                newName: "IX_LostUnits_BattleReportID");

            migrationBuilder.RenameIndex(
                name: "IX_Loot_BattleReportID1",
                table: "Loots",
                newName: "IX_Loots_BattleReportID1");

            migrationBuilder.RenameIndex(
                name: "IX_Loot_BattleReportID",
                table: "Loots",
                newName: "IX_Loots_BattleReportID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReportedUnits",
                table: "ReportedUnits",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LostUnits",
                table: "LostUnits",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Loots",
                table: "Loots",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Loots_BattleReports_BattleReportID",
                table: "Loots",
                column: "BattleReportID",
                principalTable: "BattleReports",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Loots_BattleReports_BattleReportID1",
                table: "Loots",
                column: "BattleReportID1",
                principalTable: "BattleReports",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LostUnits_BattleReports_BattleReportID",
                table: "LostUnits",
                column: "BattleReportID",
                principalTable: "BattleReports",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LostUnits_BattleReports_BattleReportID1",
                table: "LostUnits",
                column: "BattleReportID1",
                principalTable: "BattleReports",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ReportedUnits_BattleReports_BattleReportID",
                table: "ReportedUnits",
                column: "BattleReportID",
                principalTable: "BattleReports",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReportedUnits_BattleReports_BattleReportID1",
                table: "ReportedUnits",
                column: "BattleReportID1",
                principalTable: "BattleReports",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Loots_BattleReports_BattleReportID",
                table: "Loots");

            migrationBuilder.DropForeignKey(
                name: "FK_Loots_BattleReports_BattleReportID1",
                table: "Loots");

            migrationBuilder.DropForeignKey(
                name: "FK_LostUnits_BattleReports_BattleReportID",
                table: "LostUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_LostUnits_BattleReports_BattleReportID1",
                table: "LostUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_ReportedUnits_BattleReports_BattleReportID",
                table: "ReportedUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_ReportedUnits_BattleReports_BattleReportID1",
                table: "ReportedUnits");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReportedUnits",
                table: "ReportedUnits");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LostUnits",
                table: "LostUnits");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Loots",
                table: "Loots");

            migrationBuilder.RenameTable(
                name: "ReportedUnits",
                newName: "ReportedUnit");

            migrationBuilder.RenameTable(
                name: "LostUnits",
                newName: "LostUnit");

            migrationBuilder.RenameTable(
                name: "Loots",
                newName: "Loot");

            migrationBuilder.RenameIndex(
                name: "IX_ReportedUnits_BattleReportID1",
                table: "ReportedUnit",
                newName: "IX_ReportedUnit_BattleReportID1");

            migrationBuilder.RenameIndex(
                name: "IX_ReportedUnits_BattleReportID",
                table: "ReportedUnit",
                newName: "IX_ReportedUnit_BattleReportID");

            migrationBuilder.RenameIndex(
                name: "IX_LostUnits_BattleReportID1",
                table: "LostUnit",
                newName: "IX_LostUnit_BattleReportID1");

            migrationBuilder.RenameIndex(
                name: "IX_LostUnits_BattleReportID",
                table: "LostUnit",
                newName: "IX_LostUnit_BattleReportID");

            migrationBuilder.RenameIndex(
                name: "IX_Loots_BattleReportID1",
                table: "Loot",
                newName: "IX_Loot_BattleReportID1");

            migrationBuilder.RenameIndex(
                name: "IX_Loots_BattleReportID",
                table: "Loot",
                newName: "IX_Loot_BattleReportID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReportedUnit",
                table: "ReportedUnit",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LostUnit",
                table: "LostUnit",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Loot",
                table: "Loot",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Loot_BattleReports_BattleReportID",
                table: "Loot",
                column: "BattleReportID",
                principalTable: "BattleReports",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Loot_BattleReports_BattleReportID1",
                table: "Loot",
                column: "BattleReportID1",
                principalTable: "BattleReports",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LostUnit_BattleReports_BattleReportID",
                table: "LostUnit",
                column: "BattleReportID",
                principalTable: "BattleReports",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LostUnit_BattleReports_BattleReportID1",
                table: "LostUnit",
                column: "BattleReportID1",
                principalTable: "BattleReports",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ReportedUnit_BattleReports_BattleReportID",
                table: "ReportedUnit",
                column: "BattleReportID",
                principalTable: "BattleReports",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReportedUnit_BattleReports_BattleReportID1",
                table: "ReportedUnit",
                column: "BattleReportID1",
                principalTable: "BattleReports",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

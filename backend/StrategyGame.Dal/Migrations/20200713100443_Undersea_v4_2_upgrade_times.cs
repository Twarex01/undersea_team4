using Microsoft.EntityFrameworkCore.Migrations;

namespace StrategyGame.Dal.Migrations
{
    public partial class Undersea_v4_2_upgrade_times : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UpgradeTime",
                table: "UpgradeData",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PointValue",
                table: "UnitData",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "BuildTime",
                table: "BuildingData",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 1,
                column: "BuildTime",
                value: 5);

            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 2,
                column: "BuildTime",
                value: 5);

            migrationBuilder.UpdateData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 1,
                column: "PointValue",
                value: 5);

            migrationBuilder.UpdateData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 2,
                column: "PointValue",
                value: 5);

            migrationBuilder.UpdateData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 3,
                column: "PointValue",
                value: 10);

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 1,
                column: "UpgradeTime",
                value: 15);

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 2,
                column: "UpgradeTime",
                value: 15);

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 3,
                column: "UpgradeTime",
                value: 15);

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 4,
                column: "UpgradeTime",
                value: 15);

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 5,
                column: "UpgradeTime",
                value: 15);

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 6,
                column: "UpgradeTime",
                value: 15);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UpgradeTime",
                table: "UpgradeData");

            migrationBuilder.DropColumn(
                name: "PointValue",
                table: "UnitData");

            migrationBuilder.DropColumn(
                name: "BuildTime",
                table: "BuildingData");
        }
    }
}

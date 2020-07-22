using Microsoft.EntityFrameworkCore.Migrations;

namespace StrategyGame.Dal.Migrations
{
    public partial class Undersea_v7_1_ImageURLFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 3,
                column: "ImageURL",
                value: "/Assets/Buildings/stonemine_icon.png");

            migrationBuilder.UpdateData(
                table: "ResourceData",
                keyColumn: "ID",
                keyValue: 1,
                column: "ImageURL",
                value: "/Assets/Resources/coral.png");

            migrationBuilder.UpdateData(
                table: "ResourceData",
                keyColumn: "ID",
                keyValue: 2,
                column: "ImageURL",
                value: "/Assets/Resources/pearl.png");

            migrationBuilder.UpdateData(
                table: "ResourceData",
                keyColumn: "ID",
                keyValue: 3,
                column: "ImageURL",
                value: "/Assets/Resources/stone.png");

            migrationBuilder.UpdateData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 1,
                column: "ImageURL",
                value: "/Assets/Units/seal.png");

            migrationBuilder.UpdateData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 2,
                column: "ImageURL",
                value: "/Assets/Units/seahorse.png");

            migrationBuilder.UpdateData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 3,
                column: "ImageURL",
                value: "/Assets/Units/shark.png");

            migrationBuilder.UpdateData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 4,
                column: "ImageURL",
                value: "/Assets/Units/shark.png");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 1,
                column: "ImageURL",
                value: "/Assets/Upgrades/alchemy.png");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 2,
                column: "ImageURL",
                value: "/Assets/Upgrades/coralwall.png");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 3,
                column: "ImageURL",
                value: "/Assets/Upgrades/martialarts.png");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 4,
                column: "ImageURL",
                value: "/Assets/Upgrades/mudharvester.png");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 5,
                column: "ImageURL",
                value: "/Assets/Upgrades/mudtractor.png");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 6,
                column: "ImageURL",
                value: "/Assets/Upgrades/sonarcannon.png");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 3,
                column: "ImageURL",
                value: "/Assets/Buildings/stonemine_icon.svg");

            migrationBuilder.UpdateData(
                table: "ResourceData",
                keyColumn: "ID",
                keyValue: 1,
                column: "ImageURL",
                value: "Assets/Resources/coral.png");

            migrationBuilder.UpdateData(
                table: "ResourceData",
                keyColumn: "ID",
                keyValue: 2,
                column: "ImageURL",
                value: "Assets/Resources/pearl.png");

            migrationBuilder.UpdateData(
                table: "ResourceData",
                keyColumn: "ID",
                keyValue: 3,
                column: "ImageURL",
                value: "Assets/Resources/stone.svg");

            migrationBuilder.UpdateData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 2,
                column: "ImageURL",
                value: "Assets/Units/seahorse.png");

            migrationBuilder.UpdateData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 3,
                column: "ImageURL",
                value: "Assets/Units/shark.png");

            migrationBuilder.UpdateData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 4,
                column: "ImageURL",
                value: "Assets/Units/shark.png");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 1,
                column: "ImageURL",
                value: "/Assets/Upgrades/alchemy.svg");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 2,
                column: "ImageURL",
                value: "Assets/Upgrades/coralwall.svg");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 3,
                column: "ImageURL",
                value: "Assets/Upgrades/martialarts.svg");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 4,
                column: "ImageURL",
                value: "Assets/Upgrades/mudharvester.png");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 5,
                column: "ImageURL",
                value: "Assets/Upgrades/mudtractor.png");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 6,
                column: "ImageURL",
                value: "Assets/Upgrades/sonarcannon.png");
        }
    }
}

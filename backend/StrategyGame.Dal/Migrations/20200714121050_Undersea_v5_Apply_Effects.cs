using Microsoft.EntityFrameworkCore.Migrations;

namespace StrategyGame.Dal.Migrations
{
    public partial class Undersea_v5_Apply_Effects : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Upgrades");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Buildings");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "UpgradeData",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "BuildingData",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 1,
                column: "Discriminator",
                value: "FlowRegulator");

            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 2,
                column: "Discriminator",
                value: "ReefFort");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 1,
                column: "Discriminator",
                value: "Alchemy");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 2,
                column: "Discriminator",
                value: "CoralWall");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 3,
                column: "Discriminator",
                value: "MartialArts");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 4,
                column: "Discriminator",
                value: "MudHarvester");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 5,
                column: "Discriminator",
                value: "MudTractor");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 6,
                column: "Discriminator",
                value: "SonarCannon");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "UpgradeData");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "BuildingData");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Upgrades",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Buildings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}

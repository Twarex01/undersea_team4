using Microsoft.EntityFrameworkCore.Migrations;

namespace StrategyGame.Dal.Migrations
{
    public partial class Undersea_v5_ImageURL : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageURL",
                table: "UpgradeData",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageURL",
                table: "UnitData",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageURL",
                table: "ResourceData",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageURL",
                table: "BuildingData",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageURL",
                table: "UpgradeData");

            migrationBuilder.DropColumn(
                name: "ImageURL",
                table: "UnitData");

            migrationBuilder.DropColumn(
                name: "ImageURL",
                table: "ResourceData");

            migrationBuilder.DropColumn(
                name: "ImageURL",
                table: "BuildingData");
        }
    }
}

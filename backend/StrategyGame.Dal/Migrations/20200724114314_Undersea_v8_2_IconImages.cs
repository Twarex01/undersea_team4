using Microsoft.EntityFrameworkCore.Migrations;

namespace StrategyGame.Dal.Migrations
{
    public partial class Undersea_v8_2_IconImages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BackgroundURL",
                table: "BuildingData",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IconURL",
                table: "BuildingData",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "BackgroundURL", "IconURL" },
                values: new object[] { "/Assets/Buildings/flowregulator_background.png", "/Assets/Buildings/flowregulator_icon.png" });

            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 3,
                columns: new[] { "BackgroundURL", "IconURL" },
                values: new object[] { "/Assets/Buildings/stonemine_background.png", "/Assets/Buildings/stonemine_icon.png" });

            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "BackgroundURL", "IconURL" },
                values: new object[] { "/Assets/Buildings/reeffort_background.png", "/Assets/Buildings/reeffort_icon.png" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BackgroundURL",
                table: "BuildingData");

            migrationBuilder.DropColumn(
                name: "IconURL",
                table: "BuildingData");
        }
    }
}

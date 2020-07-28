using Microsoft.EntityFrameworkCore.Migrations;

namespace StrategyGame.Dal.Migrations
{
    public partial class Undersea_v9_CR4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 4,
                column: "ImageURL",
                value: "/Assets/Units/exploradora.png");

            migrationBuilder.InsertData(
                table: "UnitData",
                columns: new[] { "ID", "ATK", "Consumption", "ConsumptionUnitID", "DEF", "ImageURL", "Name", "PointValue", "Price", "PriceUnitID", "Salary", "SalaryUnitID" },
                values: new object[] { 5, 0, 2, 1, 0, "/Assets/Units/exploradora.png", "Hadvezér", 0, 200, 2, 4, 2 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 5);

            migrationBuilder.UpdateData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 4,
                column: "ImageURL",
                value: "/Assets/Units/shark.png");
        }
    }
}

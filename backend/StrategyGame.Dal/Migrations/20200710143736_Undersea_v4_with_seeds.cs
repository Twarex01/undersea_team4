using Microsoft.EntityFrameworkCore.Migrations;

namespace StrategyGame.Dal.Migrations
{
    public partial class Undersea_v4_with_seeds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "ResourceData",
                columns: new[] { "ID", "Name" },
                values: new object[,]
                {
                    { 2, "Gyöngy" },
                    { 1, "Korall" }
                });

            migrationBuilder.InsertData(
                table: "UpgradeData",
                columns: new[] { "ID", "Name" },
                values: new object[,]
                {
                    { 1, "Alkímia" },
                    { 2, "Korall fal" },
                    { 3, "Vízalatti harcművészetek" },
                    { 4, "Iszap Kombájn" },
                    { 5, "Iszap Traktor" },
                    { 6, "Szonár ágyú" }
                });

            migrationBuilder.InsertData(
                table: "BuildingData",
                columns: new[] { "ID", "Name", "Price", "PriceUnitID" },
                values: new object[,]
                {
                    { 1, "Áramlásirányító", 1000, 2 },
                    { 2, "Zátonyvár", 1000, 2 }
                });

            migrationBuilder.InsertData(
                table: "UnitData",
                columns: new[] { "ID", "ATK", "Consumption", "ConsumptionUnitID", "DEF", "Name", "Price", "PriceUnitID", "Salary", "SalaryUnitID" },
                values: new object[,]
                {
                    { 1, 6, 1, 1, 2, "Roham Fóka", 50, 2, 1, 2 },
                    { 2, 2, 1, 1, 6, "Csata Csikó", 50, 2, 1, 2 },
                    { 3, 5, 2, 1, 5, "Lézer Cápa", 100, 2, 3, 2 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "ResourceData",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ResourceData",
                keyColumn: "ID",
                keyValue: 2);
        }
    }
}

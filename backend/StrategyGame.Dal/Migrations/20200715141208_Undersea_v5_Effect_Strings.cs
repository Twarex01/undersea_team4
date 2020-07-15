using Microsoft.EntityFrameworkCore.Migrations;

namespace StrategyGame.Dal.Migrations
{
    public partial class Undersea_v5_Effect_Strings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Effect",
                table: "UpgradeData",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Effect",
                table: "BuildingData",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 1,
                column: "Effect",
                value: "50 lakost ad a népességhez és 200 korallt termel körönként");

            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 2,
                column: "Effect",
                value: "200 egység katonának nyújt szállást");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 1,
                column: "Effect",
                value: "Növeli a beszedett adót 30%-kal");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 2,
                column: "Effect",
                value: "Növeli a védelmi pontokat 20%-kal");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 3,
                column: "Effect",
                value: "Növeli a védelmi és támadóerőt 10%-kal");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 4,
                column: "Effect",
                value: "Növeli a korall termesztést 15%-kal");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 5,
                column: "Effect",
                value: "Növeli a korall termesztést 10%-kal");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 6,
                column: "Effect",
                value: "Növeli a támadópontokat 20%-kal");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Effect",
                table: "UpgradeData");

            migrationBuilder.DropColumn(
                name: "Effect",
                table: "BuildingData");
        }
    }
}

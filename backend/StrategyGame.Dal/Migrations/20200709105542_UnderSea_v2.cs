using Microsoft.EntityFrameworkCore.Migrations;

namespace StrategyGame.Dal.Migrations
{
    public partial class UnderSea_v2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "UpgradeData");

            migrationBuilder.DropColumn(
                name: "Count",
                table: "Resources");

            migrationBuilder.AddColumn<int>(
                name: "ConsumptionUnitID",
                table: "UnitData",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PriceUnitID",
                table: "UnitData",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SalaryUnitID",
                table: "UnitData",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Amount",
                table: "Resources",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProductionBase",
                table: "Resources",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProductionMultiplier",
                table: "Resources",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ArmyCapacity",
                table: "Countries",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AttackModifier",
                table: "Countries",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DefenseModifier",
                table: "Countries",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PriceUnitID",
                table: "BuildingData",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_UnitData_ConsumptionUnitID",
                table: "UnitData",
                column: "ConsumptionUnitID");

            migrationBuilder.CreateIndex(
                name: "IX_UnitData_PriceUnitID",
                table: "UnitData",
                column: "PriceUnitID");

            migrationBuilder.CreateIndex(
                name: "IX_UnitData_SalaryUnitID",
                table: "UnitData",
                column: "SalaryUnitID");

            migrationBuilder.CreateIndex(
                name: "IX_BuildingData_PriceUnitID",
                table: "BuildingData",
                column: "PriceUnitID");

            migrationBuilder.AddForeignKey(
                name: "FK_BuildingData_ResourceData_PriceUnitID",
                table: "BuildingData",
                column: "PriceUnitID",
                principalTable: "ResourceData",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UnitData_ResourceData_ConsumptionUnitID",
                table: "UnitData",
                column: "ConsumptionUnitID",
                principalTable: "ResourceData",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UnitData_ResourceData_PriceUnitID",
                table: "UnitData",
                column: "PriceUnitID",
                principalTable: "ResourceData",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UnitData_ResourceData_SalaryUnitID",
                table: "UnitData",
                column: "SalaryUnitID",
                principalTable: "ResourceData",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BuildingData_ResourceData_PriceUnitID",
                table: "BuildingData");

            migrationBuilder.DropForeignKey(
                name: "FK_UnitData_ResourceData_ConsumptionUnitID",
                table: "UnitData");

            migrationBuilder.DropForeignKey(
                name: "FK_UnitData_ResourceData_PriceUnitID",
                table: "UnitData");

            migrationBuilder.DropForeignKey(
                name: "FK_UnitData_ResourceData_SalaryUnitID",
                table: "UnitData");

            migrationBuilder.DropIndex(
                name: "IX_UnitData_ConsumptionUnitID",
                table: "UnitData");

            migrationBuilder.DropIndex(
                name: "IX_UnitData_PriceUnitID",
                table: "UnitData");

            migrationBuilder.DropIndex(
                name: "IX_UnitData_SalaryUnitID",
                table: "UnitData");

            migrationBuilder.DropIndex(
                name: "IX_BuildingData_PriceUnitID",
                table: "BuildingData");

            migrationBuilder.DropColumn(
                name: "ConsumptionUnitID",
                table: "UnitData");

            migrationBuilder.DropColumn(
                name: "PriceUnitID",
                table: "UnitData");

            migrationBuilder.DropColumn(
                name: "SalaryUnitID",
                table: "UnitData");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Resources");

            migrationBuilder.DropColumn(
                name: "ProductionBase",
                table: "Resources");

            migrationBuilder.DropColumn(
                name: "ProductionMultiplier",
                table: "Resources");

            migrationBuilder.DropColumn(
                name: "ArmyCapacity",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "AttackModifier",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "DefenseModifier",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "PriceUnitID",
                table: "BuildingData");

            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "UpgradeData",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "Resources",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace StrategyGame.Dal.Migrations
{
    public partial class Undersea_v6_CR1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BuildingData_ResourceData_PriceUnitID",
                table: "BuildingData");

            migrationBuilder.DropIndex(
                name: "IX_BuildingData_PriceUnitID",
                table: "BuildingData");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "BuildingData");

            migrationBuilder.DropColumn(
                name: "PriceUnitID",
                table: "BuildingData");

            migrationBuilder.CreateTable(
                name: "Prices",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<int>(nullable: false),
                    PriceUnitID = table.Column<int>(nullable: false),
                    BuildingID1 = table.Column<int>(nullable: true),
                    BuildingID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prices", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Prices_BuildingData_BuildingID",
                        column: x => x.BuildingID,
                        principalTable: "BuildingData",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Prices_BuildingData_BuildingID1",
                        column: x => x.BuildingID1,
                        principalTable: "BuildingData",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Prices_ResourceData_PriceUnitID",
                        column: x => x.PriceUnitID,
                        principalTable: "ResourceData",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "BuildingData",
                columns: new[] { "ID", "BuildTime", "Discriminator", "Effect", "ImageURL", "Name" },
                values: new object[] { 3, 5, "StoneMine", "Körönként 25 kővel gazdagítja a játékost", "", "Kőbánya" });

            migrationBuilder.InsertData(
                table: "Prices",
                columns: new[] { "ID", "Amount", "BuildingID", "BuildingID1", "PriceUnitID" },
                values: new object[,]
                {
                    { 2, 1000, 1, null, 2 },
                    { 4, 1000, 2, null, 2 }
                });

            migrationBuilder.InsertData(
                table: "ResourceData",
                columns: new[] { "ID", "ImageURL", "Name" },
                values: new object[] { 3, "", "Kő" });

            migrationBuilder.InsertData(
                table: "Prices",
                columns: new[] { "ID", "Amount", "BuildingID", "BuildingID1", "PriceUnitID" },
                values: new object[] { 5, 1000, 3, null, 2 });

            migrationBuilder.InsertData(
                table: "Prices",
                columns: new[] { "ID", "Amount", "BuildingID", "BuildingID1", "PriceUnitID" },
                values: new object[] { 1, 50, 1, null, 3 });

            migrationBuilder.InsertData(
                table: "Prices",
                columns: new[] { "ID", "Amount", "BuildingID", "BuildingID1", "PriceUnitID" },
                values: new object[] { 3, 50, 2, null, 3 });

            migrationBuilder.CreateIndex(
                name: "IX_Prices_BuildingID",
                table: "Prices",
                column: "BuildingID");

            migrationBuilder.CreateIndex(
                name: "IX_Prices_BuildingID1",
                table: "Prices",
                column: "BuildingID1");

            migrationBuilder.CreateIndex(
                name: "IX_Prices_PriceUnitID",
                table: "Prices",
                column: "PriceUnitID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Prices");

            migrationBuilder.DeleteData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ResourceData",
                keyColumn: "ID",
                keyValue: 3);

            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "BuildingData",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PriceUnitID",
                table: "BuildingData",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "Price", "PriceUnitID" },
                values: new object[] { 1000, 2 });

            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "Price", "PriceUnitID" },
                values: new object[] { 1000, 2 });

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
        }
    }
}

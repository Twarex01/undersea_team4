using Microsoft.EntityFrameworkCore.Migrations;

namespace StrategyGame.Dal.Migrations
{
    public partial class misspellFixed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Units_Countries_CoutryID",
                table: "Units");

            migrationBuilder.DropIndex(
                name: "IX_Units_CoutryID",
                table: "Units");

            migrationBuilder.DropColumn(
                name: "CoutryID",
                table: "Units");

            migrationBuilder.AddColumn<int>(
                name: "CountryID",
                table: "Units",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Units_CountryID",
                table: "Units",
                column: "CountryID");

            migrationBuilder.AddForeignKey(
                name: "FK_Units_Countries_CountryID",
                table: "Units",
                column: "CountryID",
                principalTable: "Countries",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Units_Countries_CountryID",
                table: "Units");

            migrationBuilder.DropIndex(
                name: "IX_Units_CountryID",
                table: "Units");

            migrationBuilder.DropColumn(
                name: "CountryID",
                table: "Units");

            migrationBuilder.AddColumn<int>(
                name: "CoutryID",
                table: "Units",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Units_CoutryID",
                table: "Units",
                column: "CoutryID");

            migrationBuilder.AddForeignKey(
                name: "FK_Units_Countries_CoutryID",
                table: "Units",
                column: "CoutryID",
                principalTable: "Countries",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

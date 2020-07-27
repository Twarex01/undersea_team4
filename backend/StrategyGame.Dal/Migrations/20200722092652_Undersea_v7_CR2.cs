using Microsoft.EntityFrameworkCore.Migrations;

namespace StrategyGame.Dal.Migrations
{
    public partial class Undersea_v7_CR2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ExplorationInfos",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Round = table.Column<int>(nullable: false),
                    InformedCountryID = table.Column<int>(nullable: true),
                    ExposedCountryID = table.Column<int>(nullable: true),
                    LastKnownDefensePower = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExplorationInfos", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ExplorationInfos_Countries_ExposedCountryID",
                        column: x => x.ExposedCountryID,
                        principalTable: "Countries",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ExplorationInfos_Countries_InformedCountryID",
                        column: x => x.InformedCountryID,
                        principalTable: "Countries",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Explorations",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SenderCountryID = table.Column<int>(nullable: true),
                    VictimCountryID = table.Column<int>(nullable: true),
                    NumberOfExplorers = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Explorations", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Explorations_Countries_SenderCountryID",
                        column: x => x.SenderCountryID,
                        principalTable: "Countries",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Explorations_Countries_VictimCountryID",
                        column: x => x.VictimCountryID,
                        principalTable: "Countries",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Round",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoundNumber = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Round", x => x.ID);
                });

            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 1,
                column: "ImageURL",
                value: "/Assets/Buildings/flowregulator.png");

            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 3,
                column: "ImageURL",
                value: "/Assets/Buildings/stonemine_icon.svg");

            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 2,
                column: "ImageURL",
                value: "/Assets/Buildings/reeffort.png");

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

            migrationBuilder.InsertData(
                table: "Round",
                columns: new[] { "ID", "RoundNumber" },
                values: new object[] { 1, 1 });

            migrationBuilder.UpdateData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 1,
                column: "ImageURL",
                value: "Assets/Units/seal.png");

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

            migrationBuilder.InsertData(
                table: "UnitData",
                columns: new[] { "ID", "ATK", "Consumption", "ConsumptionUnitID", "DEF", "ImageURL", "Name", "PointValue", "Price", "PriceUnitID", "Salary", "SalaryUnitID" },
                values: new object[] { 4, 0, 1, 1, 0, "Assets/Units/shark.png", "Felfedező", 0, 50, 2, 1, 2 });

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

            migrationBuilder.CreateIndex(
                name: "IX_ExplorationInfos_ExposedCountryID",
                table: "ExplorationInfos",
                column: "ExposedCountryID");

            migrationBuilder.CreateIndex(
                name: "IX_ExplorationInfos_InformedCountryID",
                table: "ExplorationInfos",
                column: "InformedCountryID");

            migrationBuilder.CreateIndex(
                name: "IX_Explorations_SenderCountryID",
                table: "Explorations",
                column: "SenderCountryID");

            migrationBuilder.CreateIndex(
                name: "IX_Explorations_VictimCountryID",
                table: "Explorations",
                column: "VictimCountryID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExplorationInfos");

            migrationBuilder.DropTable(
                name: "Explorations");

            migrationBuilder.DropTable(
                name: "Round");

            migrationBuilder.DeleteData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 1,
                column: "ImageURL",
                value: "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3Ae4a8d9ef-dcca-4b53-addd-0e9ec6b1ca39&params=version%3A0&token=1595286086_fac29e2b_58e760f6d8b9aa02eda4f5c868eded6278ccce9b&api_key=CometServer1");

            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 3,
                column: "ImageURL",
                value: "");

            migrationBuilder.UpdateData(
                table: "BuildingData",
                keyColumn: "ID",
                keyValue: 2,
                column: "ImageURL",
                value: "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3Addde0d54-f997-446a-b0b1-14a6b27b3a2c&params=version%3A0&token=1595286086_fac29e2b_58e760f6d8b9aa02eda4f5c868eded6278ccce9b&api_key=CometServer1");

            migrationBuilder.UpdateData(
                table: "ResourceData",
                keyColumn: "ID",
                keyValue: 1,
                column: "ImageURL",
                value: "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3Ab0dfd1d9-b7e9-4c19-aca4-a06b36fa415b&params=version%3A0&token=1595286086_fac29e2b_58e760f6d8b9aa02eda4f5c868eded6278ccce9b&api_key=CometServer1");

            migrationBuilder.UpdateData(
                table: "ResourceData",
                keyColumn: "ID",
                keyValue: 2,
                column: "ImageURL",
                value: "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3A2767b629-5fa0-46a8-a9bb-d7a3f7bf0054&params=version%3A0&token=1595286086_fac29e2b_58e760f6d8b9aa02eda4f5c868eded6278ccce9b&api_key=CometServer1");

            migrationBuilder.UpdateData(
                table: "ResourceData",
                keyColumn: "ID",
                keyValue: 3,
                column: "ImageURL",
                value: "");

            migrationBuilder.UpdateData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 1,
                column: "ImageURL",
                value: "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3A782a7431-630e-4149-b9cb-6130e5f8cbee&params=version%3A1&token=1595286086_fac29e2b_58e760f6d8b9aa02eda4f5c868eded6278ccce9b&api_key=CometServer1");

            migrationBuilder.UpdateData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 2,
                column: "ImageURL",
                value: "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3A239bcebd-c8e3-4590-95af-3248182c4bc8&params=version%3A1&token=1595286086_fac29e2b_58e760f6d8b9aa02eda4f5c868eded6278ccce9b&api_key=CometServer1");

            migrationBuilder.UpdateData(
                table: "UnitData",
                keyColumn: "ID",
                keyValue: 3,
                column: "ImageURL",
                value: "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3Aa2557965-c21f-4fc5-a489-66bdf366178d&params=version%3A0&token=1595286086_fac29e2b_58e760f6d8b9aa02eda4f5c868eded6278ccce9b&api_key=CometServer1");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 1,
                column: "ImageURL",
                value: "https://public-v2links.adobecc.com/8134ca2d-5f55-4f05-6e62-a957ac393f15/component?params=component_id%3A25076959-83e0-4e6f-ae17-d112b3cb9ca7&params=version%3A0&token=1595285518_12125b8d_b2a88399aa4d4ee75c3f36fcfa511cf2a3d05e54&api_key=CometServer1");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 2,
                column: "ImageURL",
                value: "https://public-v2links.adobecc.com/8134ca2d-5f55-4f05-6e62-a957ac393f15/component?params=component_id%3A171b5058-25fc-408f-bdf3-34bb4b3d358c&params=version%3A0&token=1595285518_12125b8d_b2a88399aa4d4ee75c3f36fcfa511cf2a3d05e54&api_key=CometServer1");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 3,
                column: "ImageURL",
                value: "https://public-v2links.adobecc.com/8134ca2d-5f55-4f05-6e62-a957ac393f15/component?params=component_id%3A8132cd33-064a-479a-a3e5-7466d133a54c&params=version%3A0&token=1595285518_12125b8d_b2a88399aa4d4ee75c3f36fcfa511cf2a3d05e54&api_key=CometServer1");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 4,
                column: "ImageURL",
                value: "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3A59672c6c-11d1-4ae3-a51c-b742f21ceb29&params=version%3A0&token=1595285550_fac29e2b_de6e44afa993a25b96be240def1a89a9c4f471aa&api_key=CometServer1");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 5,
                column: "ImageURL",
                value: "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3A3a603cad-c8ac-4583-affc-41a05e86af31&params=version%3A0&token=1595285550_fac29e2b_de6e44afa993a25b96be240def1a89a9c4f471aa&api_key=CometServer1");

            migrationBuilder.UpdateData(
                table: "UpgradeData",
                keyColumn: "ID",
                keyValue: 6,
                column: "ImageURL",
                value: "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3Ac5e81461-9dd4-4144-9af9-e3f5471b46be&params=version%3A0&token=1595286086_fac29e2b_58e760f6d8b9aa02eda4f5c868eded6278ccce9b&api_key=CometServer1");
        }
    }
}

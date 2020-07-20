using StrategyGame.Model.UpgradeTypes;

namespace StrategyGame.Model
{
    public abstract class UpgradeData
    {
        public static Alchemy Alchemy = new Alchemy { ID = 1, Name = "Alkímia", UpgradeTime = 15, Effect = "Növeli a beszedett adót 30%-kal",
            ImageURL = "https://public-v2links.adobecc.com/8134ca2d-5f55-4f05-6e62-a957ac393f15/component?params=component_id%3A25076959-83e0-4e6f-ae17-d112b3cb9ca7&params=version%3A0&token=1595285518_12125b8d_b2a88399aa4d4ee75c3f36fcfa511cf2a3d05e54&api_key=CometServer1"
        };
        public static CoralWall CoralWall = new CoralWall { ID = 2, Name = "Korall fal", UpgradeTime = 15, Effect = "Növeli a védelmi pontokat 20%-kal",
            ImageURL = "https://public-v2links.adobecc.com/8134ca2d-5f55-4f05-6e62-a957ac393f15/component?params=component_id%3A171b5058-25fc-408f-bdf3-34bb4b3d358c&params=version%3A0&token=1595285518_12125b8d_b2a88399aa4d4ee75c3f36fcfa511cf2a3d05e54&api_key=CometServer1"
        };
        public static MartialArts MartialArts = new MartialArts { ID = 3, Name = "Vízalatti harcművészetek", UpgradeTime = 15, Effect = "Növeli a védelmi és támadóerőt 10%-kal",
            ImageURL = "https://public-v2links.adobecc.com/8134ca2d-5f55-4f05-6e62-a957ac393f15/component?params=component_id%3A8132cd33-064a-479a-a3e5-7466d133a54c&params=version%3A0&token=1595285518_12125b8d_b2a88399aa4d4ee75c3f36fcfa511cf2a3d05e54&api_key=CometServer1"
        };
        public static MudHarvester MudHarvester = new MudHarvester { ID = 4, Name = "Iszap Kombájn", UpgradeTime = 15, Effect = "Növeli a korall termesztést 15%-kal",
            ImageURL = "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3A59672c6c-11d1-4ae3-a51c-b742f21ceb29&params=version%3A0&token=1595285550_fac29e2b_de6e44afa993a25b96be240def1a89a9c4f471aa&api_key=CometServer1"
        };
        public static MudTractor MudTractor = new MudTractor { ID = 5, Name = "Iszap Traktor", UpgradeTime = 15, Effect = "Növeli a korall termesztést 10%-kal",
            ImageURL = "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3A3a603cad-c8ac-4583-affc-41a05e86af31&params=version%3A0&token=1595285550_fac29e2b_de6e44afa993a25b96be240def1a89a9c4f471aa&api_key=CometServer1"
        };
        public static SonarCannon SonarCannon = new SonarCannon { ID = 6, Name = "Szonár ágyú", UpgradeTime = 15, Effect = "Növeli a támadópontokat 20%-kal",
            ImageURL = "https://public-v2links.adobecc.com/a6f48b49-2354-4be7-78c0-090bdb752a04/component?params=component_id%3Ac5e81461-9dd4-4144-9af9-e3f5471b46be&params=version%3A0&token=1595286086_fac29e2b_58e760f6d8b9aa02eda4f5c868eded6278ccce9b&api_key=CometServer1"
        };

        public int ID { get; set; }
        public string Name { get; set; }
        public int UpgradeTime { get; set; }
        public string Effect { get; set; }
        public string ImageURL { get; set; }

        public abstract void ApplyEffects(Country country);





    }
}

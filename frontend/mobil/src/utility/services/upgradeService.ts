import Network from '../network'

const UPGRADES_PATH = '/api/Details/Upgrades'

class UpgradeService {
  getUpgrades = async () => {
    return await Network.get(UPGRADES_PATH)
  }
}

const upgradeService = new UpgradeService()
export default upgradeService

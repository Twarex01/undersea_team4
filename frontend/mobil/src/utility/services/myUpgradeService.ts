import Network from '../network'

const MY_UPGRADES_PATH = '/api/Country/Upgrades'

class MyUpgradeService {
  getMyUpgrades = async () => {
    return await Network.get(MY_UPGRADES_PATH)
  }
}

const myUpgradeService = new MyUpgradeService()
export default myUpgradeService

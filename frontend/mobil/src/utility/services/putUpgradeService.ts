import Network from '../network'

const PUT_UPGRADE_PATH = '/api/Country/Upgrades/'

class PutUpgradeService {
  putUpgrade = async (upgradeTypeID: number) => {
    return await Network.put(`${PUT_UPGRADE_PATH}${upgradeTypeID}`)
  }
}

const putUpgradeService = new PutUpgradeService()
export default putUpgradeService

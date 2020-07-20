import Network from '../network'
import {UpgradeDetails} from '../../model/upgrade/upgradeDetails'
import {UpgradesResponse} from '../../model/upgrade/upgradeResponse'

const mockData: UpgradeDetails[] = [
  {
    upgradeTypeID: 1,
    name: 'Iszaptraktor',
    effect: 'növeli a krumpli\ntermesztést 10%-kal',
    imageURL: '',
  },
  {
    upgradeTypeID: 2,
    name: 'Iszaptraktor',
    effect: 'növeli a krumpli\ntermesztést 10%-kal',
    imageURL: '',
  },
  {
    upgradeTypeID: 3,
    name: 'Iszaptraktor',
    effect: 'növeli a krumpli\ntermesztést 10%-kal',
    imageURL: '',
  },
]
const mockDataResponse: UpgradesResponse = mockData
const UPGRADES_PATH = '/api/Upgrades'

class UpgradeService {
  getUpgrades = async () => {
    //return await Network.get(UPGRADES_PATH)
    return mockDataResponse
  }
}

const upgradeService = new UpgradeService()
export default upgradeService

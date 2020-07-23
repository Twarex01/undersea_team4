import Network from '../network'

const EXPLORATION_PATH = '/api/Battle/Explorations'

class ExplorationService {
  getExplorations = async () => {
    return await Network.get(EXPLORATION_PATH)
  }
}

const explorationService = new ExplorationService()
export default explorationService

import Network from '../network'

const BATTLE_PATH = '/api/Battle'

class FightService {
  getFights = async () => {
    return await Network.get(BATTLE_PATH)
  }
}

const fightService = new FightService()
export default fightService

import Network from '../network'

const NEXT_ROUND_PATH = '/api/Round'

class NexRoundService {
  postNextRound = async () => {
    return await Network.post(NEXT_ROUND_PATH)
  }
}

const nextRoundService = new NexRoundService()
export default nextRoundService

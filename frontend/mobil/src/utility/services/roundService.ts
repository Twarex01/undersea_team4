import Network from '../network'
import {RoundScore} from '../../model/round/roundScore'
import {RoundResponse} from '../../model/round/roundResponse'

const mockData: RoundScore = {id: 1, round: 4, score: 230, rank: 23}
const mockDataResponse: RoundResponse = mockData

const ROUND_PATH = 'api/Round'

class RoundService {
  getRound = async () => {
    //return await Network.get(ROUND_PATH)
    return mockDataResponse
  }
}

const roundService = new RoundService()
export default roundService

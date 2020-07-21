import Network from '../network'
import {RoundDetails} from '../../model/round/roundDetails'
import {RoundResponse} from '../../model/round/roundResponse'

const mockData: RoundDetails = {id: 1, round: 4, rank: 23}
const mockDataResponse: RoundResponse = mockData

const ROUND_PATH = 'api/Round'

class RoundService {
  getRound = async () => {
    return await Network.get(ROUND_PATH)
    //return mockDataResponse
  }
}

const roundService = new RoundService()
export default roundService

import {PlayerDetails} from '../../model/player/playerDetails'
import {PlayersResponse} from '../../model/player/playerResponse'
import Network from '../network'

const mockData: PlayerDetails[] = [
  {
    countryID: 1,
    name: 'Első',
    score: 214,
  },
  {
    countryID: 2,
    name: 'Második',
    score: 214,
  },
  {
    countryID: 3,
    name: 'Harmadik',
    score: 214,
  },
  {
    countryID: 4,
    name: 'Első',
    score: 214,
  },
  {
    countryID: 5,
    name: 'Első',
    score: 214,
  },
  {
    countryID: 6,
    name: 'Első',
    score: 214,
  },
  {
    countryID: 7,
    name: 'Második',
    score: 214,
  },
  {
    countryID: 8,
    name: 'Harmadik',
    score: 214,
  },
  {
    countryID: 9,
    name: 'Első',
    score: 214,
  },
  {
    countryID: 10,
    name: 'Első',
    score: 214,
  },
]

const mockDataResponse: PlayersResponse = mockData
const PLAYERS_PATH = '/api/Players'

class PlayerService {
  getPlayers = async () => {
    //return await Network.get(PLAYERS_PATH)
    return mockDataResponse
  }
}

const playerService = new PlayerService()
export default playerService

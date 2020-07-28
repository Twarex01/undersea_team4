import {ExploreRequest} from '../../model/battle/exploreRequest'
import Network from '../network'
import {AxiosResponse} from 'axios'

const POST_EXPLORE_PATH = '/api/Battle/Explore'

class ExploreService {
  explore = async (exploreRequest: ExploreRequest) => {
    return await Network.post<any, AxiosResponse<string>>(
      POST_EXPLORE_PATH,
      exploreRequest,
    )
  }
}

const exploreService = new ExploreService()
export default exploreService

import {AttackRequest} from '../../model/battle/attackRequest'
import Network from '../network'
import {AxiosResponse} from 'axios'

const POST_ATTACK_PATH = '/api/Battle/Attack'

class AttackService {
  attack = async (attackRequest: AttackRequest) => {
    return await Network.post<any, AxiosResponse<string>>(
      POST_ATTACK_PATH,
      attackRequest,
    )
  }
}

const attackService = new AttackService()
export default attackService

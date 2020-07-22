import {RegisterRequest} from '../../model/register/registerRequest'
import Network from '../network'
import {AxiosResponse} from 'axios'

const REGISTER_PATH = '/api/Register'

class RegisterService {
  postRegister = async (registerRequest: RegisterRequest) => {
    return await Network.post<any, AxiosResponse<string>>(
      REGISTER_PATH,
      registerRequest,
    )
  }
}

const registerService = new RegisterService()
export default registerService

import Network from '../network'
import {LoginRequest} from '../../model/login/loginRequest'
import {AxiosResponse} from 'axios'

const LOGIN_PATH = '/api/Login'

class LoginService {
  postLogin = async (loginRequest: LoginRequest) => {
    return await Network.post<any, AxiosResponse<string>>(
      LOGIN_PATH,
      loginRequest,
    )
  }
}

const loginService = new LoginService()
export default loginService

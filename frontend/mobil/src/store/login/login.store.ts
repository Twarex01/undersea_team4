import {LoginRequest} from '../../model/login/loginRequest'
import {exp} from 'react-native-reanimated'

export interface LoginStore {
  isLoading: boolean
  error: string | undefined
  login: LoginRequest
}

const initLogin: LoginRequest = {username: '', password: ''}

export const initialLoginStore: LoginStore = {
  isLoading: false,
  error: undefined,
  login: initLogin,
}

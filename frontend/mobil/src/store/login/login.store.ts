import {LoginData} from '../../model/login/loginData'
import {exp} from 'react-native-reanimated'

export interface LoginStore {
  isLoading: boolean
  error: string | undefined
  login: LoginData
}

const initLogin: LoginData = {username: '', password: ''}

export const initialLoginStore: LoginStore = {
  isLoading: false,
  error: undefined,
  login: initLogin,
}

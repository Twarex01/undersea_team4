import {RegisterRequest} from '../../model/register/registerRequest'
import {exp} from 'react-native-reanimated'

export interface RegisterStore {
  isLoading: boolean
  error: string | undefined
  register: RegisterRequest
}

const initRegister: RegisterRequest = {
  userName: '',
  password: '',
  passwordConfirmation: '',
  countryName: '',
}

export const initialRegisterStore: RegisterStore = {
  isLoading: false,
  error: undefined,
  register: initRegister,
}

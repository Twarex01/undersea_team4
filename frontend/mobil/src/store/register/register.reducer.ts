import {
  RegisterActions,
  POST_REGISTER_REQUEST,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_FAILURE,
} from './register.actions'
import {RegisterStore, initialRegisterStore} from './register.store'

export const registerReducer = (
  state = initialRegisterStore,
  action: RegisterActions,
): RegisterStore => {
  switch (action.type) {
    case POST_REGISTER_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      }
    case POST_REGISTER_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
      }
    case POST_REGISTER_FAILURE:
      return {
        ...state,
        error: action.reason,
        isLoading: false,
      }
    default:
      return state
  }
}

import {initialLoginStore, LoginStore} from './login.store'
import {
  LoginActions,
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
} from './login.actions'

export const loginReducer = (
  state = initialLoginStore,
  action: LoginActions,
): LoginStore => {
  switch (action.type) {
    case POST_LOGIN_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      }
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
      }
    case POST_LOGIN_FAILURE:
      return {
        ...state,
        error: action.reason,
        isLoading: false,
      }
    default:
      return state
  }
}

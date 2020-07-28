import {LoginRequest} from '../../model/login/loginRequest'

export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST'
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS'
export const POST_LOGIN_FAILURE = 'POST_LOGIN_FAILURE'

export interface PostLoginRequestAction {
  type: typeof POST_LOGIN_REQUEST
  successAction: () => void
  loginRequest: LoginRequest
}

export interface PostLoginSuccesAction {
  type: typeof POST_LOGIN_SUCCESS
}

export interface PostLoginFailAction {
  type: typeof POST_LOGIN_FAILURE
  reason: string | undefined
}

export type LoginActions =
  | PostLoginRequestAction
  | PostLoginSuccesAction
  | PostLoginFailAction

export const postLogin = (
  loginRequest: LoginRequest,
  successAction: () => void,
): PostLoginRequestAction => ({
  type: POST_LOGIN_REQUEST,
  successAction,
  loginRequest,
})

export const postLoginSuccessActionCreator = (): PostLoginSuccesAction => ({
  type: POST_LOGIN_SUCCESS,
})

export const postLoginFailActionCreator = (
  reason: string,
): PostLoginFailAction => ({
  type: POST_LOGIN_FAILURE,
  reason,
})

import {RegisterRequest} from '../../model/register/registerRequest'

export const POST_REGISTER_REQUEST = 'POST_REGISTER_REQUEST'
export const POST_REGISTER_SUCCESS = 'POST_REGISTER_SUCCESS'
export const POST_REGISTER_FAILURE = 'POST_REGISTER_FAILURE'

export interface PostRegisterRequestAction {
  type: typeof POST_REGISTER_REQUEST
  successAction: () => void
  failAction: () => void
  registerRequest: RegisterRequest
}

export interface PostRegisterSuccessAction {
  type: typeof POST_REGISTER_SUCCESS
}

export interface PostRegisterFailAction {
  type: typeof POST_REGISTER_FAILURE
  reason: string | undefined
}

export type RegisterActions =
  | PostRegisterRequestAction
  | PostRegisterSuccessAction
  | PostRegisterFailAction

export const postRegister = (
  registerRequest: RegisterRequest,
  successAction: () => void,
  failAction: () => void,
): PostRegisterRequestAction => ({
  type: POST_REGISTER_REQUEST,
  registerRequest,
  successAction,
  failAction,
})

export const postRegisterSuccessActionCreator = (): PostRegisterSuccessAction => ({
  type: POST_REGISTER_SUCCESS,
})

export const postRegisterFailActionCreator = (
  reason: string,
): PostRegisterFailAction => ({
  type: POST_REGISTER_FAILURE,
  reason,
})

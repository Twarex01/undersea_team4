export const POST_NEXT_ROUND_REQUEST = 'POST_NEXT_ROUND_REQUEST'
export const POST_NEXT_ROUND_SUCCESS = 'POST_NEXT_ROUND_SUCCESS'
export const POST_NEXT_ROUND_FAILURE = 'POST_NEXT_ROUND_FAILURE'

export interface PostNextRoundRequestAction {
  type: typeof POST_NEXT_ROUND_REQUEST
}

export interface PostNextRoundSuccessAction {
  type: typeof POST_NEXT_ROUND_SUCCESS
}

export interface PostNextRoundFailAction {
  type: typeof POST_NEXT_ROUND_FAILURE
  reason: string | undefined
}

export type NextRoundActions =
  | PostNextRoundRequestAction
  | PostNextRoundSuccessAction
  | PostNextRoundFailAction

export const postNextRound = (): PostNextRoundRequestAction => ({
  type: POST_NEXT_ROUND_REQUEST,
})

export const postNextRoundSuccesActionCreator = (): PostNextRoundSuccessAction => ({
  type: POST_NEXT_ROUND_SUCCESS,
})

export const postNextRoundFailActionCreator = (
  reason: string,
): PostNextRoundFailAction => ({
  type: POST_NEXT_ROUND_FAILURE,
  reason,
})

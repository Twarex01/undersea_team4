import {RoundScore} from '../../model/round/roundScore'

export const GET_ROUND_REQUEST = 'GET_ROUND_REQUEST'
export const GET_ROUND_SUCCESS = 'GET_ROUND_SUCCESS'
export const GET_ROUND_FAILURE = 'GET_ROUND_FAILURE'

export interface GetRoundRequestAction {
  type: typeof GET_ROUND_REQUEST
}

export interface GetRoundSuccessAction {
  type: typeof GET_ROUND_SUCCESS
  response: RoundScore
}

export interface GetRoundFailAction {
  type: typeof GET_ROUND_FAILURE
  reason: string | undefined
}

export type RoundActions =
  | GetRoundRequestAction
  | GetRoundSuccessAction
  | GetRoundFailAction

export const getRound = (): GetRoundRequestAction => ({
  type: GET_ROUND_REQUEST,
})

export const getRoundSuccessActionCreator = (
  round: RoundScore,
): GetRoundSuccessAction => ({
  type: GET_ROUND_SUCCESS,
  response: round,
})

export const getRoundFailActionCreator = (
  reason: string,
): GetRoundFailAction => ({
  type: GET_ROUND_FAILURE,
  reason,
})

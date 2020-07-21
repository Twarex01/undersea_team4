import {FightDetails} from '../../model/fight/fightDetails'

export const GET_FIGHTS_REQUEST = 'GET_FIGHTS_REQUEST'
export const GET_FIGHTS_SUCCESS = 'GET_FIGHTS_SUCCESS'
export const GET_FIGHTS_FAILURE = 'GET_FIGHTS_FAILURE'

export interface GetFightsRequestAction {
  type: typeof GET_FIGHTS_REQUEST
}

export interface GetFightsSuccesAction {
  type: typeof GET_FIGHTS_SUCCESS
  response: FightDetails[]
}

export interface GetFightsFailAction {
  type: typeof GET_FIGHTS_FAILURE
  reason: string | undefined
}

export type FightActions =
  | GetFightsRequestAction
  | GetFightsSuccesAction
  | GetFightsFailAction

export const getFights = (): GetFightsRequestAction => ({
  type: GET_FIGHTS_REQUEST,
})

export const getFightsSuccessActionCreator = (
  fights: FightDetails[],
): GetFightsSuccesAction => ({
  type: GET_FIGHTS_SUCCESS,
  response: fights,
})

export const getFightsFailActionCreator = (
  reason: string,
): GetFightsFailAction => ({
  type: GET_FIGHTS_FAILURE,
  reason,
})

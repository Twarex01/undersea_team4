import {PlayerDetails} from '../../model/player/playerDetails'

export const GET_PLAYERS_REQUEST = 'GET_PLAYERS_REQUEST'
export const GET_PLAYERS_SUCCESS = 'GET_PLAYERS_SUCCESS'
export const GET_PLAYERS_FAILURE = 'GET_PLAYERS_FAILURE'

export interface GetPlayersRequestAction {
  type: typeof GET_PLAYERS_REQUEST
}

export interface GetPlayersSuccesAction {
  type: typeof GET_PLAYERS_SUCCESS
  response: PlayerDetails[]
}

export interface GetPlayersFailAction {
  type: typeof GET_PLAYERS_FAILURE
  reason: string | undefined
}

export type PlayerActions =
  | GetPlayersRequestAction
  | GetPlayersSuccesAction
  | GetPlayersFailAction

export const getPlayers = (): GetPlayersRequestAction => ({
  type: GET_PLAYERS_REQUEST,
})

export const getPlayersSuccessActionCreator = (
  players: PlayerDetails[],
): GetPlayersSuccesAction => ({
  type: GET_PLAYERS_SUCCESS,
  response: players,
})

export const getPlayertFailActionCreator = (
  reason: string,
): GetPlayersFailAction => ({
  type: GET_PLAYERS_FAILURE,
  reason,
})

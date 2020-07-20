import {
  PlayerActions,
  GET_PLAYERS_REQUEST,
  GET_PLAYERS_SUCCESS,
  GET_PLAYERS_FAILURE,
} from './players.action'
import {initialPlayerStore, PlayerStore} from './player.store'

export const playerReducer = (
  state = initialPlayerStore,
  action: PlayerActions,
): PlayerStore => {
  switch (action.type) {
    case GET_PLAYERS_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      }
    case GET_PLAYERS_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
        players: action.response,
      }
    case GET_PLAYERS_FAILURE:
      return {
        ...state,
        error: action.reason,
        isLoading: false,
        players: [],
      }
    default:
      return state
  }
}

import {
  FightActions,
  GET_FIGHTS_REQUEST,
  GET_FIGHTS_SUCCESS,
  GET_FIGHTS_FAILURE,
} from './fights.action'
import {FightStore, initialFightStore} from './fights.store'

export const fightReducer = (
  state = initialFightStore,
  action: FightActions,
): FightStore => {
  switch (action.type) {
    case GET_FIGHTS_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      }
    case GET_FIGHTS_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
        fights: action.response,
      }
    case GET_FIGHTS_FAILURE:
      return {
        ...state,
        error: action.reason,
        isLoading: false,
        fights: [],
      }
    default:
      return state
  }
}

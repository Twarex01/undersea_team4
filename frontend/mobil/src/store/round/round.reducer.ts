import {initialRoundStore, RoundStore} from './round.store'
import {
  RoundActions,
  GET_ROUND_REQUEST,
  GET_ROUND_SUCCESS,
  GET_ROUND_FAILURE,
} from './round.actions'

export const roundReducer = (
  state = initialRoundStore,
  action: RoundActions,
): RoundStore => {
  switch (action.type) {
    case GET_ROUND_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      }
    case GET_ROUND_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
        round: action.response,
      }
    case GET_ROUND_FAILURE:
      return {
        ...state,
        error: action.reason,
        isLoading: false,
        round: state.round,
      }
    default:
      return state
  }
}

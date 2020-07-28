import {initialNextRoundStore, NextRoundStore} from './nextRound.store'
import {
  NextRoundActions,
  POST_NEXT_ROUND_REQUEST,
  POST_NEXT_ROUND_SUCCESS,
  POST_NEXT_ROUND_FAILURE,
} from './nextRound.actions'

export const nextRoundReducer = (
  state = initialNextRoundStore,
  action: NextRoundActions,
): NextRoundStore => {
  switch (action.type) {
    case POST_NEXT_ROUND_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      }
    case POST_NEXT_ROUND_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
      }
    case POST_NEXT_ROUND_FAILURE:
      return {
        ...state,
        error: action.reason,
        isLoading: false,
      }
    default:
      return state
  }
}

import {ExplorationStore, initialExplorationStore} from './explorations.store'
import {
  ExplorationActions,
  GET_EXPLORATIONS_REQUEST,
  GET_EXPLORATIONS_SUCCESS,
  GET_EXPLORATIONS_FAILURE,
} from './explorations.actions'

export const explorationReducer = (
  state = initialExplorationStore,
  action: ExplorationActions,
): ExplorationStore => {
  switch (action.type) {
    case GET_EXPLORATIONS_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      }
    case GET_EXPLORATIONS_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
        explorations: action.response,
      }
    case GET_EXPLORATIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.reason,
        explorations: [],
      }
    default:
      return state
  }
}

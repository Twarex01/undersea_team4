import {ResourceStore, initialResourceStore} from './resources.store'
import {
  ResourceActions,
  GET_RESOURCES_REQUEST,
  GET_RESOURCES_SUCCESS,
  GET_RESOURCES_FAILURE,
} from './resources.actions'

export const resourceReducer = (
  state = initialResourceStore,
  action: ResourceActions,
): ResourceStore => {
  switch (action.type) {
    case GET_RESOURCES_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      }
    case GET_RESOURCES_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
        resources: action.response,
      }
    case GET_RESOURCES_FAILURE:
      return {
        ...state,
        error: action.reason,
        isLoading: false,
        resources: [],
      }
    default:
      return state
  }
}

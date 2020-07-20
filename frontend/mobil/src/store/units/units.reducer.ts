import {initialUnitStore, UnitStore} from './units.store'
import {
  UnitActions,
  GET_UNITS_REQUEST,
  GET_UNITS_SUCCESS,
  GET_UNITS_FAILURE,
} from './units.actions'

export const unitReducer = (
  state = initialUnitStore,
  action: UnitActions,
): UnitStore => {
  switch (action.type) {
    case GET_UNITS_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      }
    case GET_UNITS_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
        units: action.response,
      }
    case GET_UNITS_FAILURE:
      return {
        ...state,
        error: action.reason,
        isLoading: false,
        units: [],
      }
    default:
      return state
  }
}

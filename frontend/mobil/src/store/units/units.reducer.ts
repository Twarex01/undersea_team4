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
        unitsError: undefined,
        isUnitsLoading: true,
      }
    case GET_UNITS_SUCCESS:
      return {
        ...state,
        unitsError: undefined,
        isUnitsLoading: false,
        units: action.response,
      }
    case GET_UNITS_FAILURE:
      return {
        ...state,
        unitsError: action.reason,
        isUnitsLoading: false,
        units: [],
      }
    default:
      return state
  }
}

import {
  PutUnitsActions,
  PUT_UNITS_REQUEST,
  PUT_UNITS_SUCCESS,
  PUT_UNITS_FAILURE,
} from './putUnits.actions'
import {initialPutUnitsStore, PutUnitsStore} from './putUnits.store'

export const putUnitsReducer = (
  state = initialPutUnitsStore,
  action: PutUnitsActions,
): PutUnitsStore => {
  switch (action.type) {
    case PUT_UNITS_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      }
    case PUT_UNITS_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
      }
    case PUT_UNITS_FAILURE:
      return {
        ...state,
        error: action.reason,
        isLoading: false,
      }
    default:
      return state
  }
}

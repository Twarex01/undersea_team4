import {MyUnitStore, initialMyUnitStore} from './myUnits.store'
import {
  MyUnitActions,
  GET_MY_UNITS_REQUEST,
  GET_MY_UNITS_FAILURE,
  GET_MY_UNITS_SUCCESS,
} from './myUnits.actions'

export const myUnitReducer = (
  state = initialMyUnitStore,
  action: MyUnitActions,
): MyUnitStore => {
  switch (action.type) {
    case GET_MY_UNITS_REQUEST:
      return {
        ...state,
        myUnitsError: undefined,
        isMyUnitsLoading: true,
      }
    case GET_MY_UNITS_SUCCESS:
      return {
        ...state,
        myUnitsError: undefined,
        isMyUnitsLoading: false,
        myUnits: action.response,
      }
    case GET_MY_UNITS_FAILURE:
      return {
        ...state,
        myUnitsError: action.reason,
        isMyUnitsLoading: false,
        myUnits: [],
      }
    default:
      return state
  }
}

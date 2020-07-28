import {initialPutBuildingStore, PutBuildingStore} from './putBuilding.store'
import {
  PutBuildingActions,
  PUT_BUILDING_REQUEST,
  PUT_BUILDING_SUCCESS,
  PUT_BUILDING_FAILURE,
} from './putBuilding.actions'

export const putBuildingReducer = (
  state = initialPutBuildingStore,
  action: PutBuildingActions,
): PutBuildingStore => {
  switch (action.type) {
    case PUT_BUILDING_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      }
    case PUT_BUILDING_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
      }
    case PUT_BUILDING_FAILURE:
      return {
        ...state,
        error: action.reason,
        isLoading: false,
      }
    default:
      return state
  }
}

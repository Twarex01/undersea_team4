import {BuildingStore, initialBuildingStore} from './buildings.store'
import {
  BuildingActions,
  GET_BUILDINGS_REQUEST,
  GET_BUILDINGS_SUCCESS,
  GET_BUILDINGS_FAILURE,
} from './buildings.actions'

export const buildingReducer = (
  state = initialBuildingStore,
  action: BuildingActions,
): BuildingStore => {
  switch (action.type) {
    case GET_BUILDINGS_REQUEST:
      return {
        ...state,
        buildingsError: undefined,
        isBuildingsLoading: true,
      }
    case GET_BUILDINGS_SUCCESS:
      return {
        ...state,
        buildingsError: undefined,
        isBuildingsLoading: false,
        buildings: action.response,
      }
    case GET_BUILDINGS_FAILURE:
      return {
        ...state,
        buildingsError: action.reason,
        isBuildingsLoading: false,
        buildings: [],
      }
    default:
      return state
  }
}

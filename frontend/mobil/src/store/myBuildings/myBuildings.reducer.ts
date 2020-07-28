import {
  MyBuildingActions,
  GET_MY_BUILDINGS_REQUEST,
  GET_MY_BUILDINGS_SUCCESS,
  GET_MY_BUILDINGS_FAILURE,
} from './myBuildings.action'
import {MyBuildingStore, initialMyBuildingStore} from './myBuildings.store'

export const myBuildingReducer = (
  state = initialMyBuildingStore,
  action: MyBuildingActions,
): MyBuildingStore => {
  switch (action.type) {
    case GET_MY_BUILDINGS_REQUEST:
      return {
        ...state,
        myBuildingsError: undefined,
        isMyBuildingsLoading: true,
      }
    case GET_MY_BUILDINGS_SUCCESS:
      return {
        ...state,
        myBuildingsError: undefined,
        isMyBuildingsLoading: false,
        myBuildings: action.response,
      }
    case GET_MY_BUILDINGS_FAILURE:
      return {
        ...state,
        myBuildingsError: action.reason,
        isMyBuildingsLoading: false,
        myBuildings: [],
      }
    default:
      return state
  }
}

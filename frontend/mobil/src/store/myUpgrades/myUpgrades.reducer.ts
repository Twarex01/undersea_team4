import {initialMyUpgradeStore, MyUpgradeStore} from './myUpgrades.store'
import {
  MyUpgradeActions,
  GET_MY_UPGRADES_REQUEST,
  GET_MY_UPGRADES_SUCCESS,
  GET_MY_UPGRADES_FAILURE,
} from './myUpgrades.actions'

export const myUpgradeReducer = (
  state = initialMyUpgradeStore,
  action: MyUpgradeActions,
): MyUpgradeStore => {
  switch (action.type) {
    case GET_MY_UPGRADES_REQUEST:
      return {
        ...state,
        myUpgradesError: undefined,
        isMyUpgradesLoading: true,
      }
    case GET_MY_UPGRADES_SUCCESS:
      return {
        ...state,
        myUpgradesError: undefined,
        isMyUpgradesLoading: false,
        myUpgrades: action.response,
      }
    case GET_MY_UPGRADES_FAILURE:
      return {
        ...state,
        myUpgradesError: action.reason,
        isMyUpgradesLoading: false,
        myUpgrades: [],
      }
    default:
      return state
  }
}

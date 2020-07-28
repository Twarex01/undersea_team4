import {initialUpgradeStore, UpgradeStore} from './upgrades.store'
import {
  UpgradeActions,
  GET_UPGRADES_REQUEST,
  GET_UPGRADES_SUCCESS,
  GET_UPGRADES_FAILURE,
} from './upgrades.actions'

export const upgradeReducer = (
  state = initialUpgradeStore,
  action: UpgradeActions,
): UpgradeStore => {
  switch (action.type) {
    case GET_UPGRADES_REQUEST:
      return {
        ...state,
        upgradesError: undefined,
        isUpgradesLoading: true,
      }
    case GET_UPGRADES_SUCCESS:
      return {
        ...state,
        upgradesError: undefined,
        isUpgradesLoading: false,
        upgrades: action.response,
      }
    case GET_UPGRADES_FAILURE:
      return {
        ...state,
        upgradesError: action.reason,
        isUpgradesLoading: false,
        upgrades: [],
      }
    default:
      return state
  }
}

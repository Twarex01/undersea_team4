import {initialPutUpgradeStore, PutUpgradeStore} from './putUpgrade.store'
import {
  PutUpgradeActions,
  PUT_UPGRADE_REQUEST,
  PUT_UPGRADE_SUCCESS,
  PUT_UPGRADE_FAILURE,
} from './putUpgrade.action'

export const putUpgradeReducer = (
  state = initialPutUpgradeStore,
  action: PutUpgradeActions,
): PutUpgradeStore => {
  switch (action.type) {
    case PUT_UPGRADE_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      }
    case PUT_UPGRADE_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
      }
    case PUT_UPGRADE_FAILURE:
      return {
        ...state,
        error: action.reason,
        isLoading: false,
      }
    default:
      return state
  }
}

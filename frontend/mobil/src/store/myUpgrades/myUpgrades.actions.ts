import {MyUpgradeDetails} from '../../model/upgrade/myUpgradeDetails'

export const GET_MY_UPGRADES_REQUEST = 'GET_MY_UPGRADES_REQUEST'
export const GET_MY_UPGRADES_SUCCESS = 'GET_MY_UPGRADES_SUCCESS'
export const GET_MY_UPGRADES_FAILURE = 'GET_MY_UPGRADES_FAILURE'

export interface GetMyUpgradesRequestAction {
  type: typeof GET_MY_UPGRADES_REQUEST
}

export interface GetMyUpgradesSuccessAction {
  type: typeof GET_MY_UPGRADES_SUCCESS
  response: MyUpgradeDetails[]
}

export interface GetMyUpgradesFailAction {
  type: typeof GET_MY_UPGRADES_FAILURE
  reason: string | undefined
}

export type MyUpgradeActions =
  | GetMyUpgradesRequestAction
  | GetMyUpgradesSuccessAction
  | GetMyUpgradesFailAction

export const getMyUpgrades = (): GetMyUpgradesRequestAction => ({
  type: GET_MY_UPGRADES_REQUEST,
})

export const getMyUpgradesSuccessActionCreator = (
  upgrades: MyUpgradeDetails[],
): GetMyUpgradesSuccessAction => ({
  type: GET_MY_UPGRADES_SUCCESS,
  response: upgrades,
})

export const getMyUpgradesFailActionCreator = (
  reason: string,
): GetMyUpgradesFailAction => ({
  type: GET_MY_UPGRADES_FAILURE,
  reason,
})

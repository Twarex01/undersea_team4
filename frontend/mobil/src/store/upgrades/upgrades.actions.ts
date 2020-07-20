import {UpgradeDetails} from '../../model/upgrade/upgradeDetails'

export const GET_UPGRADES_REQUEST = 'GET_UPGRADES_REQUEST'
export const GET_UPGRADES_SUCCESS = 'GET_UPGRADES_SUCCESS'
export const GET_UPGRADES_FAILURE = 'GET_UPGRADES_FAILURE'

export interface GetUpgradesRequestAction {
  type: typeof GET_UPGRADES_REQUEST
}

export interface GetUpgradesSuccessAction {
  type: typeof GET_UPGRADES_SUCCESS
  response: UpgradeDetails[]
}

export interface GetUpgradesFailAction {
  type: typeof GET_UPGRADES_FAILURE
  reason: string | undefined
}

export type UpgradeActions =
  | GetUpgradesRequestAction
  | GetUpgradesSuccessAction
  | GetUpgradesFailAction

export const getUpgrades = (): GetUpgradesRequestAction => ({
  type: GET_UPGRADES_REQUEST,
})

export const getUpgradesSuccessActionCreator = (
  upgrades: UpgradeDetails[],
): GetUpgradesSuccessAction => ({
  type: GET_UPGRADES_SUCCESS,
  response: upgrades,
})

export const getUpgradesFailActionCreator = (
  reason: string,
): GetUpgradesFailAction => ({
  type: GET_UPGRADES_FAILURE,
  reason,
})

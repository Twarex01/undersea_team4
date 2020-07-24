export const PUT_UPGRADE_REQUEST = 'PUT_UPGRADE_REQUEST'
export const PUT_UPGRADE_SUCCESS = 'PUT_UPGRADE_SUCCESS'
export const PUT_UPGRADE_FAILURE = 'PUT_UPGRADE_FAILURE'

export interface PutUpgradeRequestAction {
  type: typeof PUT_UPGRADE_REQUEST
  upgradeID: number
}

export interface PutUpgradeSuccessAction {
  type: typeof PUT_UPGRADE_SUCCESS
}

export interface PutUpgradeFailAction {
  type: typeof PUT_UPGRADE_FAILURE
  reason: string | undefined
}

export type PutUpgradeActions =
  | PutUpgradeRequestAction
  | PutUpgradeSuccessAction
  | PutUpgradeFailAction

export const putUpgrade = (buildingID: number): PutUpgradeRequestAction => ({
  type: PUT_UPGRADE_REQUEST,
  upgradeID: buildingID,
})

export const putUpgradeSuccessActionCreator = (): PutUpgradeSuccessAction => ({
  type: PUT_UPGRADE_SUCCESS,
})

export const putUpgradeFailActionCreator = (
  reason: string,
): PutUpgradeFailAction => ({
  type: PUT_UPGRADE_FAILURE,
  reason,
})

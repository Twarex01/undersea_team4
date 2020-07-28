export const PUT_BUILDING_REQUEST = 'PUT_BUILDING_REQUEST'
export const PUT_BUILDING_SUCCESS = 'PUT_BUILDING_SUCCESS'
export const PUT_BUILDING_FAILURE = 'PUT_BUILDING_FAILURE'

export interface PutBuildingRequestAction {
  type: typeof PUT_BUILDING_REQUEST
  successAction: () => void
  buildingID: number
}

export interface PutBuildingSuccessAction {
  type: typeof PUT_BUILDING_SUCCESS
}

export interface PutBuildingFailAction {
  type: typeof PUT_BUILDING_FAILURE
  reason: string | undefined
}

export type PutBuildingActions =
  | PutBuildingRequestAction
  | PutBuildingSuccessAction
  | PutBuildingFailAction

export const putBuilding = (
  buildingID: number,
  successAction: () => void,
): PutBuildingRequestAction => ({
  type: PUT_BUILDING_REQUEST,
  buildingID,
  successAction,
})

export const putBuildingSuccessActionCreator = (): PutBuildingSuccessAction => ({
  type: PUT_BUILDING_SUCCESS,
})

export const putBuildingFailActionCreator = (
  reason: string,
): PutBuildingFailAction => ({
  type: PUT_BUILDING_FAILURE,
  reason,
})

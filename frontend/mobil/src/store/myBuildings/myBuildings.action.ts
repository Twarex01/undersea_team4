import {MyBuildingDetails} from '../../model/building/myBuildingDetails'

export const GET_MY_BUILDINGS_REQUEST = 'GET_MY_BUILDINGS_REQUEST'
export const GET_MY_BUILDINGS_SUCCESS = 'GET_MY_BUILDINGS_SUCCESS'
export const GET_MY_BUILDINGS_FAILURE = 'GET_MY_BUILDINGS_FAILURE'

export interface GetMyBuildingsRequestAction {
  type: typeof GET_MY_BUILDINGS_REQUEST
}

export interface GetMyBuildingsSuccessAction {
  type: typeof GET_MY_BUILDINGS_SUCCESS
  response: MyBuildingDetails[]
}

export interface GetMyBuildingsFailAction {
  type: typeof GET_MY_BUILDINGS_FAILURE
  reason: string | undefined
}

export type MyBuildingActions =
  | GetMyBuildingsRequestAction
  | GetMyBuildingsSuccessAction
  | GetMyBuildingsFailAction

export const getMyBuildings = (): GetMyBuildingsRequestAction => ({
  type: GET_MY_BUILDINGS_REQUEST,
})

export const getMyBuildingsSuccessActionCreator = (
  myBuildings: MyBuildingDetails[],
): GetMyBuildingsSuccessAction => ({
  type: GET_MY_BUILDINGS_SUCCESS,
  response: myBuildings,
})

export const getMyBuildingsFailActionCreator = (
  reason: string,
): GetMyBuildingsFailAction => ({
  type: GET_MY_BUILDINGS_FAILURE,
  reason,
})

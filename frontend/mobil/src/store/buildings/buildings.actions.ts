import {BuildingDetails} from '../../model/building/buildingDetails'

export const GET_BUILDINGS_REQUEST = 'GET_BUILDINGS_REQUEST'
export const GET_BUILDINGS_SUCCESS = 'GET_BUILDINGS_SUCCESS'
export const GET_BUILDINGS_FAILURE = 'GET_BUILDINGS_FAILURE'

export interface GetBuildingsRequestAction {
  type: typeof GET_BUILDINGS_REQUEST
}

export interface GetBuildingsSuccessAction {
  type: typeof GET_BUILDINGS_SUCCESS
  response: BuildingDetails[]
}

export interface GetBuildingsFailAction {
  type: typeof GET_BUILDINGS_FAILURE
  reason: string | undefined
}

export type BuildingActions =
  | GetBuildingsRequestAction
  | GetBuildingsSuccessAction
  | GetBuildingsFailAction

export const getBuildings = (): GetBuildingsRequestAction => ({
  type: GET_BUILDINGS_REQUEST,
})

export const getBuildingsSuccessActionCreator = (
  buildings: BuildingDetails[],
): GetBuildingsSuccessAction => ({
  type: GET_BUILDINGS_SUCCESS,
  response: buildings,
})

export const getBuildingsFailActionCreator = (
  reason: string,
): GetBuildingsFailAction => ({
  type: GET_BUILDINGS_FAILURE,
  reason,
})

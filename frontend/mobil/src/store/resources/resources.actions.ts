import {ResourceDetails} from '../../model/resources/resourceDetails'

export const GET_RESOURCES_REQUEST = 'GET_RESOURCES_REQUEST'
export const GET_RESOURCES_SUCCESS = 'GET_RESOURCES_SUCCESS'
export const GET_RESOURCES_FAILURE = 'GET_RESOURCES_FAILURE'

export interface GetResourcesRequestAction {
  type: typeof GET_RESOURCES_REQUEST
}

export interface GetResourcesSuccessAction {
  type: typeof GET_RESOURCES_SUCCESS
  response: ResourceDetails[]
}

export interface GetResourcesFailAction {
  type: typeof GET_RESOURCES_FAILURE
  reason: string | undefined
}

export type ResourceActions =
  | GetResourcesRequestAction
  | GetResourcesSuccessAction
  | GetResourcesFailAction

export const getResources = (): GetResourcesRequestAction => ({
  type: GET_RESOURCES_REQUEST,
})

export const getResourcesSuccesActionCreator = (
  resources: ResourceDetails[],
): GetResourcesSuccessAction => ({
  type: GET_RESOURCES_SUCCESS,
  response: resources,
})

export const getResourcesFailActionCreator = (
  reason: string,
): GetResourcesFailAction => ({
  type: GET_RESOURCES_FAILURE,
  reason,
})

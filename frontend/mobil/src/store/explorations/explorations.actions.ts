import {ExplorationDetails} from '../../model/exploration/exprorationDetails'

export const GET_EXPLORATIONS_REQUEST = 'GET_EXPLORATIONS_REQUEST'
export const GET_EXPLORATIONS_SUCCESS = 'GET_EXPLORATIONS_SUCCESS'
export const GET_EXPLORATIONS_FAILURE = 'GET_EXPLORATIONS_FAILURE'

export interface GetExplorationsRequestAction {
  type: typeof GET_EXPLORATIONS_REQUEST
}

export interface GetExplorationsSuccessAction {
  type: typeof GET_EXPLORATIONS_SUCCESS
  response: ExplorationDetails[]
}

export interface GetExplorationsFailAction {
  type: typeof GET_EXPLORATIONS_FAILURE
  reason: string | undefined
}

export type ExplorationActions =
  | GetExplorationsRequestAction
  | GetExplorationsSuccessAction
  | GetExplorationsFailAction

export const getExplorations = (): GetExplorationsRequestAction => ({
  type: GET_EXPLORATIONS_REQUEST,
})

export const GetExplorationsSuccessActionCreator = (
  explorations: ExplorationDetails[],
): GetExplorationsSuccessAction => ({
  type: GET_EXPLORATIONS_SUCCESS,
  response: explorations,
})

export const GetExplorationsFailActionCreator = (
  reason: string,
): GetExplorationsFailAction => ({
  type: GET_EXPLORATIONS_FAILURE,
  reason,
})

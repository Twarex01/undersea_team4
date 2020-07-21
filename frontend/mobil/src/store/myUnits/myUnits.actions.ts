import {MyUnitDetails} from '../../model/unit/myUnitDetails'

export const GET_MY_UNITS_REQUEST = 'GET_MY_UNITS_REQUEST'
export const GET_MY_UNITS_SUCCESS = 'GET_MY_UNITS_SUCCESS'
export const GET_MY_UNITS_FAILURE = 'GET_MY_UNITS_FAILURE'

export interface GetMyUnitsRequestAction {
  type: typeof GET_MY_UNITS_REQUEST
}

export interface GetMyUnitsSuccessAction {
  type: typeof GET_MY_UNITS_SUCCESS
  response: MyUnitDetails[]
}

export interface GetMyUnitsFailAction {
  type: typeof GET_MY_UNITS_FAILURE
  reason: string | undefined
}

export type MyUnitActions =
  | GetMyUnitsRequestAction
  | GetMyUnitsSuccessAction
  | GetMyUnitsFailAction

export const getMyUnits = (): GetMyUnitsRequestAction => ({
  type: GET_MY_UNITS_REQUEST,
})

export const getMyUnitsSuccessActionCreator = (
  units: MyUnitDetails[],
): GetMyUnitsSuccessAction => ({
  type: GET_MY_UNITS_SUCCESS,
  response: units,
})

export const getMyUnitsFailActionCreator = (
  reason: string,
): GetMyUnitsFailAction => ({
  type: GET_MY_UNITS_FAILURE,
  reason,
})

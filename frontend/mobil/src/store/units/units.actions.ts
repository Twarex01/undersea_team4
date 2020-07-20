import {UnitDetails} from '../../model/unit/unitDetails'

export const GET_UNITS_REQUEST = 'GET_UNITS_REQUEST'
export const GET_UNITS_SUCCESS = 'GET_UNITS_SUCCESS'
export const GET_UNITS_FAILURE = 'GET_UNITS_FAILURE'

export interface GetUnitsRequestAction {
  type: typeof GET_UNITS_REQUEST
}

export interface GetUnitsSuccessAction {
  type: typeof GET_UNITS_SUCCESS
  response: UnitDetails[]
}

export interface GetUnitsFailAction {
  type: typeof GET_UNITS_FAILURE
  reason: string | undefined
}

export type UnitActions =
  | GetUnitsRequestAction
  | GetUnitsSuccessAction
  | GetUnitsFailAction

export const getUnits = (): GetUnitsRequestAction => ({
  type: GET_UNITS_REQUEST,
})

export const getUnitsSuccessActionCreator = (
  units: UnitDetails[],
): GetUnitsSuccessAction => ({
  type: GET_UNITS_SUCCESS,
  response: units,
})

export const getUnitsFailActionCreator = (
  reason: string,
): GetUnitsFailAction => ({
  type: GET_UNITS_FAILURE,
  reason,
})

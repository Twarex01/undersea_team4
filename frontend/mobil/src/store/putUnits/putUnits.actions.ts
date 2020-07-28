import {PutUnitRequest} from '../../model/unit/putUnitRequest'

export const PUT_UNITS_REQUEST = 'PUT_UNITS_REQUEST'
export const PUT_UNITS_SUCCESS = 'PUT_UNITS_SUCCESS'
export const PUT_UNITS_FAILURE = 'PUT_UNITS_FAILURE'

export interface PutUnitsRequestAction {
  type: typeof PUT_UNITS_REQUEST
  unitRequest: PutUnitRequest
}

export interface PutUnitsSuccessAction {
  type: typeof PUT_UNITS_SUCCESS
}

export interface PutUnitsFailAction {
  type: typeof PUT_UNITS_FAILURE
  reason: string | undefined
}

export type PutUnitsActions =
  | PutUnitsRequestAction
  | PutUnitsSuccessAction
  | PutUnitsFailAction

export const putUnits = (
  unitRequest: PutUnitRequest,
): PutUnitsRequestAction => ({
  type: PUT_UNITS_REQUEST,
  unitRequest,
})

export const putUnitsSuccessActionCreator = (): PutUnitsSuccessAction => ({
  type: PUT_UNITS_SUCCESS,
})

export const putUnitsFailActionCreator = (
  reason: string,
): PutUnitsFailAction => ({
  type: PUT_UNITS_FAILURE,
  reason,
})

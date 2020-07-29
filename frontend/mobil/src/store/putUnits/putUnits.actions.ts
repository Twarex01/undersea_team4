import {BuyUnitRequest, PutUnitRequest} from '../../model/unit/putUnitRequest'

export const PUT_UNITS_REQUEST = 'PUT_UNITS_REQUEST'
export const PUT_UNITS_SUCCESS = 'PUT_UNITS_SUCCESS'
export const PUT_UNITS_FAILURE = 'PUT_UNITS_FAILURE'
export const INCREASE_COUNT = 'INCREASE_COUNT'
export const DECREASE_COUNT = 'DECREASE_COUNT'
export const RESET_COUNT = 'RESET_COUNT'

export interface PutUnitsRequestAction {
  type: typeof PUT_UNITS_REQUEST
  successAction: () => void
  unitRequest: PutUnitRequest
}

export interface PutUnitsSuccessAction {
  type: typeof PUT_UNITS_SUCCESS
}

export interface PutUnitsFailAction {
  type: typeof PUT_UNITS_FAILURE
  reason: string | undefined
}

export interface IncreaseCountAction {
  type: typeof INCREASE_COUNT
  unitTypeID: number
}

export interface DecreaseCountAction {
  type: typeof DECREASE_COUNT
  unitTypeID: number
}

export interface ResetCountAction {
  type: typeof RESET_COUNT
}

export type PutUnitsActions =
  | PutUnitsRequestAction
  | PutUnitsSuccessAction
  | PutUnitsFailAction
  | IncreaseCountAction
  | DecreaseCountAction
  | ResetCountAction

export const putUnits = (
  unitRequest: PutUnitRequest,
  successAction: () => void,
): PutUnitsRequestAction => ({
  type: PUT_UNITS_REQUEST,
  unitRequest,
  successAction,
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

export const increaseCount = (unitTypeID: number): IncreaseCountAction => ({
  type: INCREASE_COUNT,
  unitTypeID,
})

export const decreaseCount = (unitTypeID: number): DecreaseCountAction => ({
  type: DECREASE_COUNT,
  unitTypeID,
})

export const resetCount = (): ResetCountAction => ({
  type: RESET_COUNT,
})

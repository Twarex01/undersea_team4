import {
  PutUnitsActions,
  PUT_UNITS_REQUEST,
  PUT_UNITS_SUCCESS,
  PUT_UNITS_FAILURE,
  INCREASE_COUNT,
  DECREASE_COUNT,
  RESET_COUNT,
} from './putUnits.actions'
import {initialBuyUnitsStore, BuyUnitsStore} from './putUnits.store'
import {BuyUnitRequest} from '../../model/unit/putUnitRequest'

export const putUnitsReducer = (
  state = initialBuyUnitsStore,
  action: PutUnitsActions,
): BuyUnitsStore => {
  switch (action.type) {
    case PUT_UNITS_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      }
    case PUT_UNITS_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
      }
    case PUT_UNITS_FAILURE:
      return {
        ...state,
        error: action.reason,
        isLoading: false,
      }
    case INCREASE_COUNT:
      return {
        ...state,
        buyUnits: increaseCount(action.unitTypeID, state.buyUnits),
      }
    case DECREASE_COUNT:
      return {
        ...state,
        buyUnits: decreaseCount(action.unitTypeID, state.buyUnits),
      }
    case RESET_COUNT:
      return {
        ...state,
        buyUnits: [],
      }
    default:
      return state
  }
}

const increaseCount = (
  unitTypeID: number,
  units: BuyUnitRequest,
): BuyUnitRequest => {
  const index = units.findIndex(u => u.unitTypeID === unitTypeID)
  if (index === -1) {
    units.push({unitTypeID: unitTypeID, count: 1})
  } else {
    units[index].count += 1
  }
  return units
}

const decreaseCount = (
  unitTypeID: number,
  units: BuyUnitRequest,
): BuyUnitRequest => {
  const index = units.findIndex(u => u.unitTypeID === unitTypeID)
  if (index === -1) {
    units.push({unitTypeID: unitTypeID, count: 0})
  } else {
    if (units[index].count > 0) units[index].count -= 1
  }
  return units
}

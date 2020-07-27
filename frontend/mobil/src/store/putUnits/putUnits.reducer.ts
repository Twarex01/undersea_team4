import {
  PutUnitsActions,
  PUT_UNITS_REQUEST,
  PUT_UNITS_SUCCESS,
  PUT_UNITS_FAILURE,
  INCREASE_COUNT,
  DECREASE_COUNT,
} from './putUnits.actions'
import {initialPutUnitsStore, PutUnitsStore} from './putUnits.store'
import {PutUnitRequest} from '../../model/unit/putUnitRequest'
import {useSelector} from 'react-redux'
import {IApplicationState} from '../../../store'

export const putUnitsReducer = (
  state = initialPutUnitsStore,
  action: PutUnitsActions,
): PutUnitsStore => {
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
        putUnits: increaseCount(action.unitTypeID, state.putUnits),
      }
    case DECREASE_COUNT:
      return {
        ...state,
        putUnits: decreaseCount(action.unitTypeID, state.putUnits),
      }
    default:
      return state
  }
}

const increaseCount = (
  unitTypeID: number,
  units: PutUnitRequest,
): PutUnitRequest => {
  const index = units.findIndex(u => u.unitTypeID === unitTypeID)
  if (index === -1) {
    units.push({unitTypeID: unitTypeID, unitCount: 1})
  } else {
    units[index].unitCount += 1
  }
  return units
}

const decreaseCount = (
  unitTypeID: number,
  units: PutUnitRequest,
): PutUnitRequest => {
  const index = units.findIndex(u => u.unitTypeID === unitTypeID)
  if (index === -1) {
    units.push({unitTypeID: unitTypeID, unitCount: 0})
  } else {
    if (units[index].unitCount > 0) units[index].unitCount -= 1
  }
  return units
}

import {BattleStore, initialBattleStore} from './battle.store'
import {
  BattleActions,
  POST_ATTACK_REQUEST,
  POST_ATTACK_SUCCESS,
  POST_ATTACK_FAILURE,
  POST_EXPLORE_SUCCESS,
  POST_EXPLORE_REQUEST,
  POST_EXPLORE_FAILURE,
  SET_COUNT,
  SET_ID,
} from './battle.actions'
import {BattleRequest} from '../../model/battle/battleRequest'
import {RESET_COUNT} from '../putUnits/putUnits.actions'

export const battleReducer = (
  state = initialBattleStore,
  action: BattleActions,
): BattleStore => {
  switch (action.type) {
    case POST_ATTACK_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      }
    case POST_ATTACK_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
      }
    case POST_ATTACK_FAILURE:
      return {
        ...state,
        error: action.reason,
        isLoading: false,
      }
    case POST_EXPLORE_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      }
    case POST_EXPLORE_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
      }
    case POST_EXPLORE_FAILURE:
      return {
        ...state,
        error: action.reason,
        isLoading: false,
      }
    case SET_COUNT:
      return {
        ...state,
        battle: setCount(action.unitTypeID, action.count, state.battle),
      }
    case SET_ID:
      return {
        ...state,
        battle: setID(action.cityID),
      }
    case RESET_COUNT:
      return {
        ...state,
        battle: {idDef: state.battle.idDef, battle: []},
      }
    default:
      return state
  }
}

const setCount = (
  unitTypeID: number,
  count: number,
  battle: BattleRequest,
): BattleRequest => {
  const index = battle.battle.findIndex(b => b.unitTypeID === unitTypeID)
  if (index === -1) {
    battle.battle.push({unitTypeID: unitTypeID, count: count})
  } else {
    battle.battle[index].count = count
  }
  return battle
}

const setID = (cityID: number): BattleRequest => {
  const tmp: BattleRequest = {idDef: cityID, battle: []}
  return tmp
}

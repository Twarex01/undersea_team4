import {BattleRequest} from '../../model/battle/battleRequest'

export interface BattleStore {
  isLoading: boolean
  error: string | undefined
  battle: BattleRequest
}

const initBattle: BattleRequest = {idDef: 0, battle: []}

export const initialBattleStore: BattleStore = {
  isLoading: false,
  error: undefined,
  battle: initBattle,
}

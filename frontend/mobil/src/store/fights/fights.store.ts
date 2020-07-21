import {FightDetails} from '../../model/fight/fightDetails'

export interface FightStore {
  isLoading: boolean
  error: string | undefined
  fights: FightDetails[]
}

export const initialFightStore: FightStore = {
  isLoading: false,
  error: undefined,
  fights: [],
}

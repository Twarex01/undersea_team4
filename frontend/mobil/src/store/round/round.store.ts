import {RoundScore} from '../../model/round/roundScore'

export interface RoundStore {
  isLoading: boolean
  error: string | undefined
  round: RoundScore
}

const initRound: RoundScore = {id: 0, round: 0, score: 0, rank: 0}

export const initialRoundStore: RoundStore = {
  isLoading: false,
  error: undefined,
  round: initRound,
}

import {RoundDetails} from '../../model/round/roundDetails'

export interface RoundStore {
  isLoading: boolean
  error: string | undefined
  round: RoundDetails
}

const initRound: RoundDetails = {id: 0, round: 0, rank: 0}

export const initialRoundStore: RoundStore = {
  isLoading: false,
  error: undefined,
  round: initRound,
}

import {ExplorationDetails} from '../../model/exploration/exprorationDetails'

export interface ExplorationStore {
  isLoading: boolean
  error: string | undefined
  explorations: ExplorationDetails[]
}

export const initialExplorationStore: ExplorationStore = {
  isLoading: false,
  error: undefined,
  explorations: [],
}

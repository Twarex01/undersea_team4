import {PlayerDetails} from '../../model/player/playerDetails'

export interface PlayerStore {
  isLoading: boolean
  error: string | undefined
  players: PlayerDetails[]
}

export const initialPlayerStore: PlayerStore = {
  isLoading: false,
  error: undefined,
  players: [],
}

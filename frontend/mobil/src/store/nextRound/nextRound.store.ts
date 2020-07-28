export interface NextRoundStore {
  isLoading: boolean
  error: string | undefined
}

export const initialNextRoundStore: NextRoundStore = {
  isLoading: false,
  error: undefined,
}

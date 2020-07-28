export interface PutUpgradeStore {
  isLoading: boolean
  error: string | undefined
  upgradeID: number
}

export const initialPutUpgradeStore: PutUpgradeStore = {
  isLoading: false,
  error: undefined,
  upgradeID: 0,
}

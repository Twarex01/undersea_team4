import {UpgradeDetails} from '../../model/upgrade/upgradeDetails'

export interface UpgradeStore {
  isLoading: boolean
  error: string | undefined
  upgrades: UpgradeDetails[]
}

export const initialUpgradeStore: UpgradeStore = {
  isLoading: false,
  error: undefined,
  upgrades: [],
}

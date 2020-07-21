import {UpgradeDetails} from '../../model/upgrade/upgradeDetails'

export interface UpgradeStore {
  isUpgradesLoading: boolean
  upgradesError: string | undefined
  upgrades: UpgradeDetails[]
}

export const initialUpgradeStore: UpgradeStore = {
  isUpgradesLoading: false,
  upgradesError: undefined,
  upgrades: [],
}

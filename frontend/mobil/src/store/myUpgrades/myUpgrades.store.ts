import {MyUpgradeDetails} from '../../model/upgrade/myUpgradeDetails'

export interface MyUpgradeStore {
  isMyUpgradesLoading: boolean
  myUpgradesError: string | undefined
  myUpgrades: MyUpgradeDetails[]
}

export const initialMyUpgradeStore: MyUpgradeStore = {
  isMyUpgradesLoading: false,
  myUpgradesError: undefined,
  myUpgrades: [],
}

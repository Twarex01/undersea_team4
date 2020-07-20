import {AnyAction, combineReducers, Reducer} from 'redux'
import {UpgradeStore} from './src/store/upgrades/upgrades.store'
import {upgradeReducer} from './src/store/upgrades/upgrades.reducer'
import {UnitStore} from './src/store/units/units.store'
import {unitReducer} from './src/store/units/units.reducer'
import {BuildingStore} from './src/store/buildings/buildings.store'
import {buildingReducer} from './src/store/buildings/buildings.reducer'
import {PlayerStore} from './src/store/players/player.store'
import {playerReducer} from './src/store/players/player.reducer'

export interface IAppStore {
  upgrade: UpgradeStore
  unit: UnitStore
  building: BuildingStore
  player: PlayerStore
}

export interface IApplicationState {
  app: IAppStore
}

export const RESET_EVERYTHING = 'RESET_EVERYTHING'

export interface ResetAction {
  type: typeof RESET_EVERYTHING
}

export const reset = (): ResetAction => ({
  type: RESET_EVERYTHING,
})

export const appReducer = combineReducers<IAppStore>({
  upgrade: upgradeReducer,
  unit: unitReducer,
  building: buildingReducer,
  player: playerReducer,
})

export const appRootReducer: Reducer<IAppStore> = (
  state: IAppStore | undefined,
  action: AnyAction,
): IAppStore => {
  if (action.type === RESET_EVERYTHING) {
    state = undefined
  }
  return appReducer(state, action)
}

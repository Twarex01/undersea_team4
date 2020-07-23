import {AnyAction, combineReducers, Reducer} from 'redux'
import {UpgradeStore} from './src/store/upgrades/upgrades.store'
import {upgradeReducer} from './src/store/upgrades/upgrades.reducer'
import {UnitStore} from './src/store/units/units.store'
import {unitReducer} from './src/store/units/units.reducer'
import {BuildingStore} from './src/store/buildings/buildings.store'
import {buildingReducer} from './src/store/buildings/buildings.reducer'
import {PlayerStore} from './src/store/players/player.store'
import {playerReducer} from './src/store/players/player.reducer'
import {LoginStore} from './src/store/login/login.store'
import {loginReducer} from './src/store/login/login.reducer'
import {RoundStore} from './src/store/round/round.store'
import {roundReducer} from './src/store/round/round.reducer'
import {fightReducer} from './src/store/fights/fights.reducer'
import {FightStore} from './src/store/fights/fights.store'
import {myBuildingReducer} from './src/store/myBuildings/myBuildings.reducer'
import {MyBuildingStore} from './src/store/myBuildings/myBuildings.store'
import {MyUnitStore} from './src/store/myUnits/myUnits.store'
import {myUnitReducer} from './src/store/myUnits/myUnits.reducer'
import {MyUpgradeStore} from './src/store/myUpgrades/myUpgrades.store'
import {myUpgradeReducer} from './src/store/myUpgrades/myUpgrades.reducer'
import {CountryStore} from './src/store/country/country.store'
import {countryReducer} from './src/store/country/country.reducer'
import {ResourceStore} from './src/store/resources/resources.store'
import {resourceReducer} from './src/store/resources/resources.reducer'
import {registerReducer} from './src/store/register/register.reducer'
import {RegisterStore} from './src/store/register/register.store'
import {NextRoundStore} from './src/store/nextRound/nextRound.store'
import {nextRoundReducer} from './src/store/nextRound/nextRound.reducer'
import {ExplorationStore} from './src/store/explorations/explorations.store'
import {explorationReducer} from './src/store/explorations/explorations.reducer'

export interface IAppStore {
  upgrade: UpgradeStore
  unit: UnitStore
  building: BuildingStore
  player: PlayerStore
  login: LoginStore
  round: RoundStore
  fight: FightStore
  myBuilding: MyBuildingStore
  myUnit: MyUnitStore
  myUpgrade: MyUpgradeStore
  country: CountryStore
  resource: ResourceStore
  register: RegisterStore
  nextRound: NextRoundStore
  exploration: ExplorationStore
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
  login: loginReducer,
  round: roundReducer,
  fight: fightReducer,
  myBuilding: myBuildingReducer,
  myUnit: myUnitReducer,
  myUpgrade: myUpgradeReducer,
  country: countryReducer,
  resource: resourceReducer,
  register: registerReducer,
  nextRound: nextRoundReducer,
  exploration: explorationReducer,
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

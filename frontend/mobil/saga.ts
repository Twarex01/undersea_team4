import {all} from 'redux-saga/effects'
import {upgradeSaga} from './src/store/upgrades/upgrades.saga'
import {unitSaga} from './src/store/units/units.saga'
import {buildingSaga} from './src/store/buildings/buildings.saga'
import {playerSaga} from './src/store/players/player.saga'
import {loginSaga} from './src/store/login/login.saga'
import {roundSaga} from './src/store/round/round.saga'
import {fightSaga} from './src/store/fights/fights.saga'
import {myBuildingSaga} from './src/store/myBuildings/myBuildings.saga'
import {myUnitSaga} from './src/store/myUnits/myUnits.saga'
import {myUpgradeSaga} from './src/store/myUpgrades/myUpgrades.saga'
import {countrySaga} from './src/store/country/country.saga'
import {resourceSaga} from './src/store/resources/resources.saga'

export function* rootSaga() {
  yield all([
    upgradeSaga(),
    unitSaga(),
    buildingSaga(),
    playerSaga(),
    loginSaga(),
    roundSaga(),
    fightSaga(),
    myBuildingSaga(),
    myUnitSaga(),
    myUpgradeSaga(),
    countrySaga(),
    resourceSaga(),
  ])
}

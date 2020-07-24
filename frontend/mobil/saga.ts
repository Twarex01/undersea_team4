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
import {registerSaga} from './src/store/register/register.saga'
import {nextRoundSaga} from './src/store/nextRound/nextRound.saga'
import {explorationSaga} from './src/store/explorations/explorations.saga'
import {putBuildingSaga} from './src/store/putBuilding/putBuilding.saga'
import {putUpgradeSaga} from './src/store/putUpgrade/putUpgrade.saga'
import {putUnitsSaga} from './src/store/putUnits/putUnits.saga'

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
    registerSaga(),
    nextRoundSaga(),
    explorationSaga(),
    putBuildingSaga(),
    putUpgradeSaga(),
    putUnitsSaga(),
  ])
}

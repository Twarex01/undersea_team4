import {all} from 'redux-saga/effects'
import {upgradeSaga} from './src/store/upgrades/upgrades.saga'
import {unitSaga} from './src/store/units/units.saga'
import {buildingSaga} from './src/store/buildings/buildings.saga'
import {playerSaga} from './src/store/players/player.saga'

export function* rootSaga() {
  yield all([upgradeSaga(), unitSaga(), buildingSaga(), playerSaga()])
}

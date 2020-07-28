import {all, takeEvery, put} from 'redux-saga/effects'
import {
  GET_MY_UPGRADES_REQUEST,
  GetMyUpgradesRequestAction,
  getMyUpgradesSuccessActionCreator,
  getMyUpgradesFailActionCreator,
} from './myUpgrades.actions'
import {AxiosResponse} from 'axios'
import myUpgradeService from '../../utility/services/myUpgradeService'
import {MyUpgradesResponse} from '../../model/upgrade/myUpgradeResponse'

export function* myUpgradeSaga() {
  yield all([watchPost()])
}

function* watchPost() {
  yield takeEvery(GET_MY_UPGRADES_REQUEST, getMyUpgradesActionWatcher)
}

function* getMyUpgradesActionWatcher(action: GetMyUpgradesRequestAction) {
  try {
    const response: AxiosResponse<MyUpgradesResponse> = yield myUpgradeService.getMyUpgrades()
    yield put(getMyUpgradesSuccessActionCreator(response.data))
  } catch (error) {
    console.log(error.response)
    const errorMessage = 'Hiba'
    yield put(getMyUpgradesFailActionCreator(errorMessage))
  }
}

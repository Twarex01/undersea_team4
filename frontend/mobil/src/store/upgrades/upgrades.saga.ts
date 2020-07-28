import {all, takeEvery, put, debounce} from 'redux-saga/effects'
import {AxiosResponse} from 'axios'
import {
  GET_UPGRADES_REQUEST,
  GetUpgradesRequestAction,
  getUpgradesSuccessActionCreator,
  getUpgradesFailActionCreator,
} from './upgrades.actions'
import {} from '../../model/upgrade/upgradeDetails'
import upgradeService from '../../utility/services/upgradeService'
import {UpgradesResponse} from '../../model/upgrade/upgradeResponse'

export function* upgradeSaga() {
  yield all([watchPost()])
}

function* watchPost() {
  yield takeEvery(GET_UPGRADES_REQUEST, getUpgradesActionWatcher)
}

function* getUpgradesActionWatcher(action: GetUpgradesRequestAction) {
  try {
    const response: AxiosResponse<UpgradesResponse> = yield upgradeService.getUpgrades()
    yield put(getUpgradesSuccessActionCreator(response.data))
  } catch (error) {
    console.log(error.response)
    const errorMessage = 'Hiba'
    yield put(getUpgradesFailActionCreator(errorMessage))
  }
}

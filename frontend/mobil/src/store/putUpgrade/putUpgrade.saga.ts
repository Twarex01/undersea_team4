import {all, takeEvery, put} from 'redux-saga/effects'
import {
  PUT_UPGRADE_REQUEST,
  PutUpgradeRequestAction,
  putUpgradeSuccessActionCreator,
  putUpgradeFailActionCreator,
} from './putUpgrade.action'
import {AxiosResponse} from 'axios'
import putUpgradeService from '../../utility/services/putUpgradeService'

export function* putUpgradeSaga() {
  yield all([watchPost()])
}

export function* watchPost() {
  yield takeEvery(PUT_UPGRADE_REQUEST, putUpgradeActionWatcher)
}

function* putUpgradeActionWatcher(action: PutUpgradeRequestAction) {
  try {
    const response: AxiosResponse<string> = yield putUpgradeService.putUpgrade(
      action.upgradeID,
    )
    yield put(putUpgradeSuccessActionCreator())
    action.successAction()
  } catch (error) {
    console.log(error.response)
    const errorMessage = 'Hiba'
    yield put(putUpgradeFailActionCreator(errorMessage))
  }
}

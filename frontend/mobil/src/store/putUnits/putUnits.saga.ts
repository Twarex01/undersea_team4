import {all, takeEvery, put} from 'redux-saga/effects'
import {
  PUT_UNITS_REQUEST,
  PutUnitsRequestAction,
  putUnitsFailActionCreator,
  putUnitsSuccessActionCreator,
} from './putUnits.actions'
import {AxiosResponse} from 'axios'
import putUnitsService from '../../utility/services/putUnitService'

export function* putUnitsSaga() {
  yield all([watchPost()])
}

function* watchPost() {
  yield takeEvery(PUT_UNITS_REQUEST, putUnitsActionWatcher)
}

function* putUnitsActionWatcher(action: PutUnitsRequestAction) {
  try {
    const response: AxiosResponse<string> = yield putUnitsService.putUnits(
      action.unitRequest,
    )
    yield put(putUnitsSuccessActionCreator())
    action.successAction()
  } catch (error) {
    console.log(error.response)
    const errorMessage = error.response.data
    yield put(putUnitsFailActionCreator(errorMessage))
    action.failAction()
  }
}

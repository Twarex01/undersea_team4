import {all, debounce, takeEvery, put} from 'redux-saga/effects'
import {
  GET_UNITS_REQUEST,
  GetUnitsRequestAction,
  getUnitsSuccessActionCreator,
  getUnitsFailActionCreator,
} from './units.actions'
import {UnitsResponse} from '../../model/unit/unitResponse'
import unitService from '../../utility/services/unitService'
import {AxiosResponse} from 'axios'

export function* unitSaga() {
  yield all([watchPost()])
}

function* watchPost() {
  yield takeEvery(GET_UNITS_REQUEST, getUnitsActionWatcher)
}

function* getUnitsActionWatcher(action: GetUnitsRequestAction) {
  try {
    const response: AxiosResponse<UnitsResponse> = yield unitService.getUnits()
    yield put(getUnitsSuccessActionCreator(response.data))
  } catch (error) {
    console.log(error.response)
    const errorMessage = 'Hiba'
    yield put(getUnitsFailActionCreator(errorMessage))
  }
}

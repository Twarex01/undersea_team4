import {
  GetMyUnitsRequestAction,
  GET_MY_UNITS_REQUEST,
  getMyUnitsSuccessActionCreator,
  getMyUnitsFailActionCreator,
} from './myUnits.actions'
import {all, takeEvery, put} from 'redux-saga/effects'
import {AxiosResponse} from 'axios'
import myUnitService from '../../utility/services/myUnitService'
import {MyUnitsResponse} from '../../model/unit/myUnitResponse'

export function* myUnitSaga() {
  yield all([watchPost()])
}

function* watchPost() {
  yield takeEvery(GET_MY_UNITS_REQUEST, getMyUnitsActionWatcher)
}

function* getMyUnitsActionWatcher(action: GetMyUnitsRequestAction) {
  try {
    const response: AxiosResponse<MyUnitsResponse> = yield myUnitService.getMyUnits()
    yield put(getMyUnitsSuccessActionCreator(response.data))
  } catch (error) {
    console.log(error.response)
    const errorMessage = 'Hiba'
    yield put(getMyUnitsFailActionCreator(errorMessage))
  }
}

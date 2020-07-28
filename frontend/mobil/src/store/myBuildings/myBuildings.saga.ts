import {all, takeEvery, put} from 'redux-saga/effects'
import {
  GET_MY_BUILDINGS_REQUEST,
  getMyBuildingsSuccessActionCreator,
  getMyBuildingsFailActionCreator,
  GetMyBuildingsRequestAction,
} from './myBuildings.action'
import {AxiosResponse} from 'axios'
import {MyBuildingsResponse} from '../../model/building/myBuildingResponse'
import myBuildingService from '../../utility/services/myBuildingService'

export function* myBuildingSaga() {
  yield all([watchPost()])
}

function* watchPost() {
  yield takeEvery(GET_MY_BUILDINGS_REQUEST, getMyBuildingsActionWatcher)
}

function* getMyBuildingsActionWatcher(action: GetMyBuildingsRequestAction) {
  try {
    const response: AxiosResponse<MyBuildingsResponse> = yield myBuildingService.getMyBuildings()
    yield put(getMyBuildingsSuccessActionCreator(response.data))
  } catch (error) {
    console.log(error.response)
    const errorMessage = 'Hiba'
    yield put(getMyBuildingsFailActionCreator(errorMessage))
  }
}

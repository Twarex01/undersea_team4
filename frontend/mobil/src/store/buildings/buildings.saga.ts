import {
  GET_BUILDINGS_REQUEST,
  GetBuildingsRequestAction,
  getBuildingsSuccessActionCreator,
  getBuildingsFailActionCreator,
} from './buildings.actions'
import {BuildingsResponse} from '../../model/building/buildingResponse'
import buildingService from '../../utility/services/buildingService'
import {put, takeEvery, all} from 'redux-saga/effects'

export function* buildingSaga() {
  yield all([watchPost()])
}

function* watchPost() {
  yield takeEvery(GET_BUILDINGS_REQUEST, getBuildingsActionWatcher)
}

function* getBuildingsActionWatcher(action: GetBuildingsRequestAction) {
  try {
    //const response: AxiosResponse<BuildingsResponse> = yield buildingService.getBuildings()
    const response: BuildingsResponse = yield buildingService.getBuildings()
    //yield put(getBuildingsSuccessActionCreator(response.data.buildings))
    yield put(getBuildingsSuccessActionCreator(response))
  } catch (error) {
    console.log(error.response)
    const errorMessage = 'Hiba'
    yield put(getBuildingsFailActionCreator(errorMessage))
  }
}

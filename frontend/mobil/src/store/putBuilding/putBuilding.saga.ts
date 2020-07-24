import {all, takeEvery, put} from 'redux-saga/effects'
import {
  PUT_BUILDING_REQUEST,
  PutBuildingRequestAction,
  putBuildingSuccessActionCreator,
  putBuildingFailActionCreator,
} from './putBuilding.actions'
import {AxiosResponse} from 'axios'
import putBuildingService from '../../utility/services/putBuildingService'

export function* putBuildingSaga() {
  yield all([watchPost()])
}

export function* watchPost() {
  yield takeEvery(PUT_BUILDING_REQUEST, putBuildingActionWatcher)
}

function* putBuildingActionWatcher(action: PutBuildingRequestAction) {
  try {
    const response: AxiosResponse<string> = yield putBuildingService.putBuilding(
      action.buildingID,
    )
    yield put(putBuildingSuccessActionCreator())
  } catch (error) {
    console.log(error.response)
    const errorMessage = 'Hiba'
    yield put(putBuildingFailActionCreator(errorMessage))
  }
}

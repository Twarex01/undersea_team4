import {takeEvery, all, put} from 'redux-saga/effects'
import {
  GET_RESOURCES_REQUEST,
  GetResourcesRequestAction,
  getResourcesSuccesActionCreator,
  getResourcesFailActionCreator,
} from './resources.actions'
import {AxiosResponse} from 'axios'
import {ResourceResponse} from '../../model/resources/resourceResponse'
import resourceService from '../../utility/services/resourceservice'

export function* resourceSaga() {
  yield all([watchPost()])
}

function* watchPost() {
  yield takeEvery(GET_RESOURCES_REQUEST, getResourcesActionWatcher)
}

function* getResourcesActionWatcher(action: GetResourcesRequestAction) {
  try {
    const response: AxiosResponse<ResourceResponse> = yield resourceService.getResources()
    yield put(getResourcesSuccesActionCreator(response.data))
  } catch (error) {
    console.log(error.response)
    const errorMessage = 'Hiba'
    yield put(getResourcesFailActionCreator(errorMessage))
  }
}

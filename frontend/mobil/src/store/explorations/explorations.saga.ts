import {
  GET_EXPLORATIONS_REQUEST,
  GetExplorationsRequestAction,
  GetExplorationsSuccessActionCreator,
  GetExplorationsFailActionCreator,
} from './explorations.actions'
import {AxiosResponse} from 'axios'
import {ExplorationResponse} from '../../model/exploration/explorationResponse'
import explorationService from '../../utility/services/explorationService'
import {put, all, takeEvery} from 'redux-saga/effects'

export function* explorationSaga() {
  yield all([watchPost()])
}

function* watchPost() {
  yield takeEvery(GET_EXPLORATIONS_REQUEST, getExplorationsActionWatcher)
}
function* getExplorationsActionWatcher(action: GetExplorationsRequestAction) {
  try {
    const response: AxiosResponse<ExplorationResponse> = yield explorationService.getExplorations()
    yield put(GetExplorationsSuccessActionCreator(response.data))
  } catch (error) {
    console.log(error)
    const errorMessage = 'Hiba'
    yield put(GetExplorationsFailActionCreator(errorMessage))
  }
}

import {all, takeEvery, put} from 'redux-saga/effects'
import {
  POST_ATTACK_REQUEST,
  POST_EXPLORE_REQUEST,
  PostAttackRequestAction,
  PostExploreRequestAction,
  postAttackSuccessActionCreator,
  postAttackFailActionCreator,
  postExploreFailActionCreator,
} from './battle.actions'
import {AxiosResponse} from 'axios'
import attackService from '../../utility/services/attackService'
import exploreService from '../../utility/services/exploreService'

export function* battleSaga() {
  yield all([watchPost()])
}

function* watchPost() {
  yield takeEvery(POST_ATTACK_REQUEST, postAttackActionWatcher)
  yield takeEvery(POST_EXPLORE_REQUEST, postExploreActionWatcher)
}

function* postAttackActionWatcher(action: PostAttackRequestAction) {
  try {
    const response: AxiosResponse<string> = yield attackService.attack(
      action.attackRequest,
    )
    yield put(postAttackSuccessActionCreator())
  } catch (error) {
    console.log(error.response)
    const errorMessage = 'Hiba'
    yield put(postAttackFailActionCreator(errorMessage))
  }
}

function* postExploreActionWatcher(action: PostExploreRequestAction) {
  try {
    const response: AxiosResponse<string> = yield exploreService.explore(
      action.exploreRequest,
    )
  } catch (error) {
    console.log(error.response)
    const errorMessage = 'Hiba'
    yield put(postExploreFailActionCreator(errorMessage))
  }
}

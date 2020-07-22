import {all, takeEvery, put} from 'redux-saga/effects'
import {
  POST_NEXT_ROUND_REQUEST,
  PostNextRoundRequestAction,
  postNextRoundSuccesActionCreator,
  postNextRoundFailActionCreator,
} from './nextRound.actions'
import nextRoundService from '../../utility/services/nextRoundService'

export function* nextRoundSaga() {
  yield all([watchPost()])
}

function* watchPost() {
  yield takeEvery(POST_NEXT_ROUND_REQUEST, postNextRoundActionWatcher)
}

function* postNextRoundActionWatcher(action: PostNextRoundRequestAction) {
  try {
    yield nextRoundService.postNextRound()
    yield put(postNextRoundSuccesActionCreator())
  } catch (error) {
    console.log(error.response)
    const errorMessage = 'Hiba'
    yield put(postNextRoundFailActionCreator(errorMessage))
  }
}

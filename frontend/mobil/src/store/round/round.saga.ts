import {all, debounce, takeEvery, put} from 'redux-saga/effects'
import {
  GET_ROUND_REQUEST,
  GetRoundRequestAction,
  getRoundSuccessActionCreator,
  getRoundFailActionCreator,
} from './round.actions'
import {AxiosResponse} from 'axios'
import {RoundResponse} from '../../model/round/roundResponse'
import roundService from '../../utility/services/roundService'

export function* roundSaga() {
  yield all([watchPost()])
}

function* watchPost() {
  yield takeEvery(GET_ROUND_REQUEST, getRoundActionWatcher)
}

function* getRoundActionWatcher(action: GetRoundRequestAction) {
  try {
    const response: AxiosResponse<RoundResponse> = yield roundService.getRound()
    yield put(getRoundSuccessActionCreator(response.data))
  } catch (error) {
    console.log(error.response)
    const errorMessage = 'Hiba'
    yield put(getRoundFailActionCreator(errorMessage))
  }
}

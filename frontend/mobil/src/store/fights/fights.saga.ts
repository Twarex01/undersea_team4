import {takeEvery, put, all} from 'redux-saga/effects'
import {
  GET_FIGHTS_REQUEST,
  GetFightsRequestAction,
  getFightsSuccessActionCreator,
  getFightsFailActionCreator,
} from './fights.action'
import {AxiosResponse} from 'axios'
import {FightResponse} from '../../model/fight/fightResponse'
import fightService from '../../utility/services/fightService'

export function* fightSaga() {
  yield all([watchPost()])
}

function* watchPost() {
  yield takeEvery(GET_FIGHTS_REQUEST, getFightssActionWatcher)
}

function* getFightssActionWatcher(action: GetFightsRequestAction) {
  try {
    const response: AxiosResponse<FightResponse> = yield fightService.getFights()
    yield put(getFightsSuccessActionCreator(response.data))
  } catch (error) {
    console.log(error.response)
    const errorMessage = 'Hiba'
    yield put(getFightsFailActionCreator(errorMessage))
  }
}

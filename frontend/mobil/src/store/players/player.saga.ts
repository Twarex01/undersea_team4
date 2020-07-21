import {all, takeEvery, put} from 'redux-saga/effects'
import {
  GET_PLAYERS_REQUEST,
  GetPlayersRequestAction,
  getPlayersSuccessActionCreator,
  getPlayertFailActionCreator,
} from './players.action'
import {AxiosResponse} from 'axios'
import {PlayersResponse} from '../../model/player/playerResponse'
import playerService from '../../utility/services/playerService'

export function* playerSaga() {
  yield all([watchPost()])
}

function* watchPost() {
  yield takeEvery(GET_PLAYERS_REQUEST, getPlayersActionWatcher)
}

function* getPlayersActionWatcher(action: GetPlayersRequestAction) {
  try {
    const response: AxiosResponse<PlayersResponse> = yield playerService.getPlayers()
    //const response: PlayersResponse = yield playerService.getPlayers()
    yield put(getPlayersSuccessActionCreator(response.data))
    //yield put(getPlayersSuccessActionCreator(response))
  } catch (error) {
    console.log(error.response)
    const errorMessage = 'Hiba'
    yield put(getPlayertFailActionCreator(errorMessage))
  }
}

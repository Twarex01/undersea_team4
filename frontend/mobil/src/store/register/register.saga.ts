import {all, takeEvery, put} from 'redux-saga/effects'
import {
  POST_REGISTER_REQUEST,
  PostRegisterRequestAction,
  postRegisterSuccessActionCreator,
} from './register.actions'
import {AxiosResponse} from 'axios'
import registerService from '../../utility/services/registerService'
import AsyncStorage from '@react-native-community/async-storage'
import {postLogin, postLoginFailActionCreator} from '../login/login.actions'

export function* registerSaga() {
  yield all([watchPost()])
}

function* watchPost() {
  yield takeEvery(POST_REGISTER_REQUEST, postRegisterActionWatcher)
}

function* postRegisterActionWatcher(action: PostRegisterRequestAction) {
  try {
    const response: AxiosResponse<string> = yield registerService.postRegister(
      action.registerRequest,
    )
    yield put(postRegisterSuccessActionCreator())
    action.successAction()
  } catch (error) {
    console.log(error.response)
    const errorMessage = 'Hiba'
    yield put(postLoginFailActionCreator(errorMessage))
  }
}

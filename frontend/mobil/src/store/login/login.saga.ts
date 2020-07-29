import {all, takeEvery, put} from 'redux-saga/effects'
import {
  POST_LOGIN_REQUEST,
  PostLoginRequestAction,
  postLoginFailActionCreator,
  postLoginSuccessActionCreator,
} from './login.actions'
import loginService from '../../utility/services/loginService'
import {AxiosResponse} from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import {Token} from '../../constants/token'

export function* loginSaga() {
  yield all([watchPost()])
}

function* watchPost() {
  yield takeEvery(POST_LOGIN_REQUEST, postLoginActionWatcher)
}

function* postLoginActionWatcher(action: PostLoginRequestAction) {
  try {
    const response: AxiosResponse<string> = yield loginService.postLogin(
      action.loginRequest,
    )
    yield AsyncStorage.setItem(Token.ACCESS_TOKEN, response.data)
    yield put(postLoginSuccessActionCreator())
    action.successAction()
  } catch (error) {
    console.log(error.response)
    const errorMessage = error.response.data
    yield put(postLoginFailActionCreator(errorMessage))
    action.failAction()
  }
}

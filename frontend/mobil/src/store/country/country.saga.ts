import {all, takeEvery, put} from 'redux-saga/effects'
import {
  GET_COUNTRY_REQUEST,
  GetCountryRequestAction,
  getCountrySuccesActionCreator,
  getCountryFailActionCreator,
} from './country.actions'
import {AxiosResponse} from 'axios'
import {CountryResponse} from '../../model/country/countryResponse'
import countryService from '../../utility/services/countryService'

export function* countrySaga() {
  yield all([watchPost()])
}

function* watchPost() {
  yield takeEvery(GET_COUNTRY_REQUEST, getCountryActionWatcher)
}

function* getCountryActionWatcher(action: GetCountryRequestAction) {
  try {
    const response: AxiosResponse<CountryResponse> = yield countryService.getCountry()
    yield put(getCountrySuccesActionCreator(response.data))
  } catch (error) {
    console.log(error.response)
    const errorMessage = 'Hiba'
    yield put(getCountryFailActionCreator(errorMessage))
  }
}

import {CountryStore, initialcountryStore} from './country.store'
import {
  CountryActions,
  GET_COUNTRY_REQUEST,
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_FAILURE,
} from './country.actions'

export const countryReducer = (
  state = initialcountryStore,
  action: CountryActions,
): CountryStore => {
  switch (action.type) {
    case GET_COUNTRY_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      }
    case GET_COUNTRY_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
        country: action.response,
      }
    case GET_COUNTRY_FAILURE:
      return {
        ...state,
        error: action.reason,
        isLoading: false,
        country: [],
      }
    default:
      return state
  }
}

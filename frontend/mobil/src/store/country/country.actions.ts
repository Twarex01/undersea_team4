import {CountryDetails} from '../../model/country/countryDetails'

export const GET_COUNTRY_REQUEST = 'GET_COUNTRY_REQUEST'
export const GET_COUNTRY_SUCCESS = 'GET_COUNTRY_SUCCESS'
export const GET_COUNTRY_FAILURE = 'GET_COUNTRY_FAILURE'

export interface GetCountryRequestAction {
  type: typeof GET_COUNTRY_REQUEST
}

export interface GetCountrySuccesAction {
  type: typeof GET_COUNTRY_SUCCESS
  response: CountryDetails
}

export interface GetCountryFailAction {
  type: typeof GET_COUNTRY_FAILURE
  reason: string | undefined
}

export type CountryActions =
  | GetCountryRequestAction
  | GetCountrySuccesAction
  | GetCountryFailAction

export const getCountry = (): GetCountryRequestAction => ({
  type: GET_COUNTRY_REQUEST,
})

export const getCountrySuccesActionCreator = (
  country: CountryDetails,
): GetCountrySuccesAction => ({
  type: GET_COUNTRY_SUCCESS,
  response: country,
})

export const getCountryFailActionCreator = (
  reason: string,
): GetCountryFailAction => ({
  type: GET_COUNTRY_FAILURE,
  reason,
})

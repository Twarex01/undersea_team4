import {CountryDetails} from '../../model/country/countryDetails'

export interface CountryStore {
  isLoading: boolean
  error: string | undefined
  country: CountryDetails[]
}

export const initialcountryStore: CountryStore = {
  isLoading: false,
  error: undefined,
  country: [],
}

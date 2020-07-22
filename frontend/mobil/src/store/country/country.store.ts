import {CountryDetails} from '../../model/country/countryDetails'

export interface CountryStore {
  isLoading: boolean
  error: string | undefined
  country: CountryDetails
}

const initCountry: CountryDetails = {
  id: 0,
  name: '',
  score: 0,
  armyCapacity: 0,
  population: 0,
}

export const initialcountryStore: CountryStore = {
  isLoading: false,
  error: undefined,
  country: initCountry,
}

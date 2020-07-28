import Network from '../network'

const COUNTRY_DETAILS_PATH = '/api/Country/Details'

class CountryService {
  getCountry = async () => {
    return await Network.get(COUNTRY_DETAILS_PATH)
  }
}

const countryService = new CountryService()
export default countryService

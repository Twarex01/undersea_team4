import Network from '../network'

const MY_UNITS_PATH = '/api/Country/Units'

class MyUnitService {
  getMyUnits = async () => {
    return await Network.get(MY_UNITS_PATH)
  }
}

const myUnitService = new MyUnitService()
export default myUnitService

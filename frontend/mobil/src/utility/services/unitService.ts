import Network from '../network'

const UNITS_PATH = '/api/Details/Units'

class UnitService {
  getUnits = async () => {
    return await Network.get(UNITS_PATH)
  }
}

const unitService = new UnitService()
export default unitService

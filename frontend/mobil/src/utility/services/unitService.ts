import Network from '../network'
import {UnitDetails} from '../../model/unit/unitDetails'
import {UnitsResponse} from '../../model/unit/unitResponse'

const mockData: UnitDetails[] = [
  {
    unitTypeID: 1,
    name: 'Lézercápa',
    attack: 5,
    def: 5,
    salary: 1,
    consumption: 1,
    price: 200,
    salaryTypeName: 'Gyöngy',
    consumptionTypeName: 'Korall',
    priceTypeName: 'Gyöngy',
  },
  {
    unitTypeID: 2,
    name: 'Lézercápa',
    attack: 5,
    def: 5,
    salary: 1,
    consumption: 1,
    price: 200,
    salaryTypeName: 'Gyöngy',
    consumptionTypeName: 'Korall',
    priceTypeName: 'Gyöngy',
  },
  {
    unitTypeID: 3,
    name: 'Lézercápa',
    attack: 5,
    def: 5,
    salary: 1,
    consumption: 1,
    price: 200,
    salaryTypeName: 'Gyöngy',
    consumptionTypeName: 'Korall',
    priceTypeName: 'Gyöngy',
  },
]

const mockDataResponse: UnitsResponse = mockData
const UNITS_PATH = '/api/Units'

class UnitService {
  getUnits = async () => {
    //return await Network.get(UNITS_PATH)
    return mockDataResponse
  }
}

const unitService = new UnitService()
export default unitService

import {PutUnitRequest} from '../../model/unit/putUnitRequest'
import Network from '../network'
import {exp} from 'react-native-reanimated'

const PUT_UNITS_PATH = '/api/Country/Units'

class PutUnitsService {
  putUnits = async (putUnitRequest: PutUnitRequest) => {
    return await Network.put(PUT_UNITS_PATH, putUnitRequest)
  }
}

const putUnitsService = new PutUnitsService()
export default putUnitsService

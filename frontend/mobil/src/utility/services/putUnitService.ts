import {PutUnitRequest} from '../../model/unit/putUnitRequest'
import Network from '../network'
import {useSelector} from 'react-redux'
import {IApplicationState} from '../../../store'
import {AxiosResponse} from 'axios'

const PUT_UNITS_PATH = '/api/Country/Units'

class PutUnitsService {
  putUnits = async (putUnitRequest: PutUnitRequest) => {
    return await Network.put<any, AxiosResponse<string>>(
      PUT_UNITS_PATH,
      putUnitRequest,
    )
  }
}

const putUnitsService = new PutUnitsService()
export default putUnitsService

import {BuildingDetails} from '../../model/building/buildingDetails'
import {BuildingsResponse} from '../../model/building/buildingResponse'

const mockData: BuildingDetails[] = [
  {
    buildingTypeID: 1,
    name: 'Zátonyvár',
    price: 45,
    priceTypeName: 'Gyöngy',
    effect: '50 embert ad a népességhez\n200 krumplit termel körönként',
    buildTime: 10,
    imageURL: '',
  },
  {
    buildingTypeID: 2,
    name: 'Áramlásirányító',
    price: 45,
    priceTypeName: 'Gyöngy',
    effect: '50 embert ad a népességhez\n200 krumplit termel körönként',
    buildTime: 10,
    imageURL: '',
  },
]

const mockDataResponse: BuildingsResponse = mockData
const BUILDINGS_PATH = '/api/Buildings'

class BuildingService {
  getBuildings = async () => {
    //return await Network.get(BUILDINGS_PATH)
    return mockDataResponse
  }
}

const buildingService = new BuildingService()
export default buildingService

import Network from '../network'

const BUILDINGS_PATH = '/api/Details/Buildings'

class BuildingService {
  getBuildings = async () => {
    return await Network.get(BUILDINGS_PATH)
  }
}

const buildingService = new BuildingService()
export default buildingService

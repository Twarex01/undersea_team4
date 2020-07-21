import Network from '../network'

const MY_BUILDINGS_PATH = '/api/Country/Buildings'

class MyBuildingService {
  getMyBuildings = async () => {
    return await Network.get(MY_BUILDINGS_PATH)
  }
}

const myBuildingService = new MyBuildingService()
export default myBuildingService

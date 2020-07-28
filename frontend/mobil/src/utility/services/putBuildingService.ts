import Network from '../network'

const PUT_BUILDING_PATH = '/api/Country/Buildings/'

class PutBuildingService {
  putBuilding = async (buildingTypeID: number) => {
    return await Network.put(`${PUT_BUILDING_PATH}${buildingTypeID}`)
  }
}

const putBuildingService = new PutBuildingService()
export default putBuildingService

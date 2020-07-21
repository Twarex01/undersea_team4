import Network from '../network'

const RESOURCE_PATH = '/api/Country/Resources'

class ResourceService {
  getResources = async () => {
    return await Network.get(RESOURCE_PATH)
  }
}

const resourceService = new ResourceService()
export default resourceService

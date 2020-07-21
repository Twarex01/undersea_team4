import {MyBuildingDetails} from '../../model/building/myBuildingDetails'

export interface MyBuildingStore {
  isMyBuildingsLoading: boolean
  myBuildingsError: string | undefined
  myBuildings: MyBuildingDetails[]
}

export const initialMyBuildingStore: MyBuildingStore = {
  isMyBuildingsLoading: false,
  myBuildingsError: undefined,
  myBuildings: [],
}

import {BuildingDetails} from '../../model/building/buildingDetails'

export interface BuildingStore {
  isBuildingsLoading: boolean
  buildingsError: string | undefined
  buildings: BuildingDetails[]
}

export const initialBuildingStore: BuildingStore = {
  isBuildingsLoading: false,
  buildingsError: undefined,
  buildings: [],
}

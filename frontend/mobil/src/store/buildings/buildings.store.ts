import {BuildingDetails} from '../../model/building/buildingDetails'

export interface BuildingStore {
  isLoading: boolean
  error: string | undefined
  buildings: BuildingDetails[]
}

export const initialBuildingStore: BuildingStore = {
  isLoading: false,
  error: undefined,
  buildings: [],
}

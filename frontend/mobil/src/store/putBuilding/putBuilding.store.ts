export interface PutBuildingStore {
  isLoading: boolean
  error: string | undefined
  buildingID: number
}

export const initialPutBuildingStore: PutBuildingStore = {
  isLoading: false,
  error: undefined,
  buildingID: 0,
}

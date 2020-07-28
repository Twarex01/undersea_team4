import {PutUnitRequest} from '../../model/unit/putUnitRequest'

export interface PutUnitsStore {
  isLoading: boolean
  error: string | undefined
  putUnits: PutUnitRequest
}

export const initialPutUnitsStore: PutUnitsStore = {
  isLoading: false,
  error: undefined,
  putUnits: [],
}

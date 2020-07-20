import {UnitDetails} from '../../model/unit/unitDetails'

export interface UnitStore {
  isLoading: boolean
  error: string | undefined
  units: UnitDetails[]
}

export const initialUnitStore: UnitStore = {
  isLoading: false,
  error: undefined,
  units: [],
}

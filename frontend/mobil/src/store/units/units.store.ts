import {UnitDetails} from '../../model/unit/unitDetails'

export interface UnitStore {
  isUnitsLoading: boolean
  unitsError: string | undefined
  units: UnitDetails[]
}

export const initialUnitStore: UnitStore = {
  isUnitsLoading: false,
  unitsError: undefined,
  units: [],
}

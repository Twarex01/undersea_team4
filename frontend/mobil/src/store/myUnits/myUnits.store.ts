import {MyUnitDetails} from '../../model/unit/myUnitDetails'

export interface MyUnitStore {
  isMyUnitsLoading: boolean
  myUnitsError: string | undefined
  myUnits: MyUnitDetails[]
}

export const initialMyUnitStore: MyUnitStore = {
  isMyUnitsLoading: false,
  myUnitsError: undefined,
  myUnits: [],
}

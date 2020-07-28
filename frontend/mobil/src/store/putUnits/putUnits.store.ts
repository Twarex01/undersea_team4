import {BuyUnitRequest} from '../../model/unit/putUnitRequest'

export interface BuyUnitsStore {
  isLoading: boolean
  error: string | undefined
  buyUnits: BuyUnitRequest
}

export const initialBuyUnitsStore: BuyUnitsStore = {
  isLoading: false,
  error: undefined,
  buyUnits: [],
}

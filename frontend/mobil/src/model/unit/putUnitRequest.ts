export interface BuyUnitDetails {
  unitTypeID: number
  count: number
}

export interface BuyUnitRequest extends Array<BuyUnitDetails> {}

export interface PutUnitDetails {
  unitTypeID: number
  unitCount: number
}

export interface PutUnitRequest extends Array<PutUnitDetails> {}

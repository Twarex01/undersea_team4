export interface PutUnitDetails {
  unitTypeID: number
  count: number
}

export interface PutUnitRequest extends Array<PutUnitDetails> {}

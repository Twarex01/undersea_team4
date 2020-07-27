export interface PutUnitDetails {
  unitTypeID: number
  attackCount: number
}

export interface PutUnitRequest extends Array<PutUnitDetails> {}

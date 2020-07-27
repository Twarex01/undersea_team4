export interface PutUnitDetails {
  unitTypeID: number
  unitCount: number
}

export interface PutUnitRequest extends Array<PutUnitDetails> {}

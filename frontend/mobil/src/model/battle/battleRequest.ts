export interface Battle {
  unitTypeID: number
  count: number
}
export interface BattleRequest {
  idDef: number
  battle: Battle[]
}

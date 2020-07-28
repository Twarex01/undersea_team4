export interface AttackRequest {
  idAtt: number
  idDef: number
  army: Army[]
}
export interface Army {
  unitTypeID: number
  unitCount: number
}

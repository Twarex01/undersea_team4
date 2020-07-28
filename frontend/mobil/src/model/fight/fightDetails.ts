export interface FightDetails {
  defenderName: string
  units: UnitCount[]
}

export interface UnitCount {
  name: string
  count: number
}

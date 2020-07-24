export interface BuildingDetails {
  buildingTypeID: number
  name: string | undefined
  prices: Prices[]
  effect: string | undefined
  buildTime: number
  imageURL: string
  iconURL: string
  backgroundURL: string
}

export interface Prices {
  price: number
  priceTypeName: string
}

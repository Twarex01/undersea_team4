import {ResourceDetails} from '../../model/resources/resourceDetails'

export interface ResourceStore {
  isLoading: boolean
  error: string | undefined
  resources: ResourceDetails[]
}

export const initialResourceStore: ResourceStore = {
  isLoading: false,
  error: undefined,
  resources: [],
}

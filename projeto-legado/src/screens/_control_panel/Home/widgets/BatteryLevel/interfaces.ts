import { Headlights } from '../../interfaces'

export interface DataInterface {
  low: number
  low_percentage: number
  medium: number
  medium_percentage: number
  high: number
  high_percentage: number
  average_consumption: number
  headlights: Headlights[]
}

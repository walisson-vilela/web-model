import { Headlights } from '../../interfaces'

export interface DataInterface {
  attendances: number
  planned: number
  added: number
  in_progress: number
  justified: number
  punctuality_in: number | null
  punctuality_percentage: number | null
  realized: number
  realized_percentage: number
  headlights: Headlights[]
}

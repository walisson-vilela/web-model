import { Headlights } from '../../interfaces'

export interface DataInterface {
  actives: number
  without_attendances: number
  adherence_percentage: number
  headlights: Headlights[]
}

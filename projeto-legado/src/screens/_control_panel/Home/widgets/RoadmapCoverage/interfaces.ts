import { Headlights } from '../../interfaces'

export interface DataInterface {
  actives: number
  inactives: number
  actives_without_route: number
  total_users: number
  covered_routes: number
  uncovered_routes: number
  total_routes: number
  covered_routes_percentual: number
  headlights: Headlights[]
}

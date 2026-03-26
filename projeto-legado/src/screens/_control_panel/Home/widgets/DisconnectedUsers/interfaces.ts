import { Headlights } from '../../interfaces'

export interface DataInterface {
  total_users: number
  total_disconnected: number
  two_hours: number
  four_hours: number
  twenty_four_hours: number
  attendance_started: number
  attendance_started_percentage: number
  attendance_not_started: number
  attendance_not_started_percentage: number
  headlights: Headlights[]
}

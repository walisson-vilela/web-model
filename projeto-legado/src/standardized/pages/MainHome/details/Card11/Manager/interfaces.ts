import type React from 'react'

export interface BodyInterface {
  status: React.ReactNode
  name: React.ReactNode
  supervisor: string
  route_name: React.ReactNode
  planned_attendances: number
  added_attendances: number
  realized_attendances: number
  planned_distance: string
  real_distance: string
}

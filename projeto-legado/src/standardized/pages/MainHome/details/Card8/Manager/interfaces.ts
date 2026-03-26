import type React from 'react'

export interface BodyInterface {
  status: React.ReactNode
  name: React.ReactNode
  supervisor: string
  route_name: React.ReactNode
  displacements: number
  real_distance: string
  real_time: string
  ideal_speed: string
  real_speed: React.ReactNode
}

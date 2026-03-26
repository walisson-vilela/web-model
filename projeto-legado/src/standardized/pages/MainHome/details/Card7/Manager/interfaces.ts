import type React from 'react'

export interface BodyInterface {
  name: string
  supervisor: string
  route_name: string
  pdvs_day: number
  variation_goal: string
  below_label: React.ReactNode
  above_label: React.ReactNode
  out_of_route: string
}

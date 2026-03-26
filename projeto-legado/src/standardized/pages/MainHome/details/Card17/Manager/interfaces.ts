import type { ReactNode } from 'react'

export type DataInterface = {
  name: string
  role: string
  supervisor: string
  route_name: string
  area: string
  reason: string
  date: string
  total_days: number
}

export type BodyInterface = {
  name: ReactNode
  role: ReactNode
  supervisor: ReactNode
  route_name: ReactNode
  area: ReactNode
  reason: ReactNode
  date: ReactNode
  total_days: ReactNode
}

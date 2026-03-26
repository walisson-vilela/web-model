import type { ReactNode } from 'react'

export type DataInterface = {
  store: string
  route_name: string
  origin: string
  executor: string
  justification: string
  occurrence_date: string
  total_days: number
  supervisor: string
  group: string
  network: string
  flag: string
}

export type BodyInterface = {
  store: ReactNode
  route_name: ReactNode
  origin: ReactNode
  executor: ReactNode
  justification: ReactNode
  occurrence_date: ReactNode
  total_days: ReactNode
}

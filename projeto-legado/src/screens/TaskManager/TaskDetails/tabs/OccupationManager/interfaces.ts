import type { ReactNode } from 'react'

export interface DataInterface {
  id?: number | null
  name?: string | null
  status_color?: string | null
  cities: string[] | null
  states: string[] | null
  sublocalities: string[] | null
  store_count?: number | null
  executor_count?: number | null
  accomplished_p1?: number | null
  accomplished_p0?: number | null
  reach?: number | null
}

export interface BodyInterface {
  id: number | null
  name: ReactNode | null
  store_count: number | null
  executor_count: number | null
  accomplished_p1: string | null
  accomplished_p0: string | null
  reach: string | null
}

import type { ReactNode } from 'react'

export interface DataInterface {
  id?: number | null
  name?: string | null
  status_color?: string | null
  accomplished_p1?: number | null
  accomplished_p0?: number | null
  reach?: number | null
  default_fields?: string[] | null
  default_fields_count?: number | null
}

export interface BodyInterface {
  id: number | null
  name: ReactNode | null
  accomplished_p1: string | null
  accomplished_p0: string | null
  reach: string | null
  default_fields: JSX.Element | null
}

import type { ReactNode } from 'react'

export interface DataInterface {
  id?: number | null
  name?: string | null
  role_name?: string | null
  supervisor_name?: string | null
  route_name?: string | null
  region_name?: string | null
  visit_count?: string | null
  check?: number | null
  task_percent?: number | null
}

export interface BodyInterface {
  id: number | null
  name: ReactNode | null
  role_name: string | null
  supervisor_name: string | null
  route_name: string | null
  region_name: string | null
  visit_count: ReactNode | null
  check: number | null
  task_percent: string | null
}

import type { ReactNode } from 'react'

export type DataInterface = {
  id: string
  store: string
  route_name: string
  area: string
  executor: string
  occurrence_date: string
  occurrence_type: string
  supervisor: string
  group: string
  network: string
  flag: string
  has_observation: boolean
  has_image: boolean
}

export type BodyInterface = {
  _original: DataInterface
  id: ReactNode
  store: ReactNode
  route_name: ReactNode
  area: ReactNode
  executor: ReactNode
  occurrence_date: ReactNode
  occurrence_type: ReactNode
  observation: ReactNode
  image: ReactNode
}

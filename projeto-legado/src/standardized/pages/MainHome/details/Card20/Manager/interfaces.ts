import type { ReactNode } from 'react'

export type OriginType = 'Rota' | 'Carteira'

export type DataInterface = {
  pdv: string
  route_name: string
  origin: OriginType
  executor: string
  check_time: string
  distance: string
  supervisor: string
}

export type BodyInterface = {
  pdv: ReactNode
  route_name: ReactNode
  origin: ReactNode
  executor: ReactNode
  check_time: ReactNode
  registered_by: ReactNode
  distance: ReactNode
}

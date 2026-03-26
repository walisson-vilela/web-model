import { ReactNode } from 'react'

export interface BodyInterface {
  /** Nome */
  name: string

  /** Status */
  status: string
  status_label: ReactNode | string

  /** Supervisor */
  supervisor: string

  /** Hierarquia */
  hierarchy: string

  /** Nome do roteiro */
  route_name: string

  /** Qtde. PDV's dia */
  pdvs_day: number | string

  /** Carteira */
  wallet: string

  /** Rota planejada */
  planned_route: string
}

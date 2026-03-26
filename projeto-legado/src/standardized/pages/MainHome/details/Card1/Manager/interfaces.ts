import { ReactNode } from 'react'

export interface BodyInterface {
  /** Nome */
  name: ReactNode | string

  /** Função */
  role: string

  /** Status */
  status: string
  status_label: ReactNode | string

  /** Motivo Inativação */
  inactivation_reason: string

  /** Supervisor */
  supervisor: string

  /** Nome do roteiro */
  route_name: string

  /** Área de atuação */
  operation_area: string

  /** Carteira */
  wallet: string

  /** Rota planejada */
  planned_route: string
}

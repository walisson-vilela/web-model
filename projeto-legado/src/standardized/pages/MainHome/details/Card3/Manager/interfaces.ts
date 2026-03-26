import { ReactNode } from 'react'

export interface BodyInterface {
  /** Nome */
  people_name: string

  /** Função */
  role_name: string

  /** Status */
  active: string
  active_jsx: ReactNode | string

  /** Supervisor */
  supervisor_name: string

  /** Hierarquia */
  supervisor_hierarchy: string

  /** Atendimento iniciado */
  attendance_started: string

  /** Ultima Conexão */
  last_connection: string

  /** Desconectado */
  disconnected_time: string

  /** Classificação */
  classification: string
}

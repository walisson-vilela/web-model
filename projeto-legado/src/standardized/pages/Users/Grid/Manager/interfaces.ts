import { PERSON_STATUS } from '../../labels'

export interface BodyInterface {
  /** ID */
  id: number

  /** status */
  status: (typeof PERSON_STATUS)[keyof typeof PERSON_STATUS]
  /** status (jsx) */
  status_label: JSX.Element

  /** Eventos */
  event_count: number | null

  /** Usuário */
  name: string

  /** Matrícula */
  registration: string | null

  /** Log-in */
  username: string | null

  /** Função */
  role_name: JSX.Element | string | null
  role: {
    id: number
    name: string | null
    access_level_label: string
    internal_access: boolean
    master: boolean
    hierarchies: {
      id: number
      name: string | null
    }[]
  } | null

  /** Conta/Grupo */
  route_contractor_name: string | null
}

import { ReactNode } from 'react'

export interface Hierarchies {
  id?: number
  hierarchy_id: number
  name: string
  hierarchy_structure_id: number | null
}

export interface BodyInterface {
  /** Status */
  status: string
  status_label: ReactNode | string

  /** ID */
  id: number

  /** Função */
  name: string

  /** Tipo */
  default_label: string
  default: boolean

  /** Master */
  master: boolean

  /** Nível de Acesso */
  access_level_label: string
  access_level_id: number

  /** Atributos Internos */
  internal_access_label: string
  internal_access: boolean

  /** Representatividade */
  user_percentage: string | null

  /** Usuário */
  user_count: number

  /** Menus */
  menus: number[]

  /** Pilares */
  hierarchies: Hierarchies[]
}

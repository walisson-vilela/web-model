export type { Licenses } from '../../../../../hooks/useLicenses/interfaces'

export type Form = {
  /** id */
  id: number | null
  /** Usuários Associados */
  user_count: number

  /** Função */
  name: string
  /** Nível de Acesso */
  access_level_id: number | null
  /** Atributos Internos */
  internal_access: boolean
  /** Pilares */
  hierarchies: {
    id?: number
    hierarchy_id: number
    name: string
    hierarchy_structure_id: number | null
  }[]
}

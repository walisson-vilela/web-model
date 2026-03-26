/** Função */
export type Role = {
  id: number
  name: string
  access_level_id: number
  access_level_label: string

  internal_access: boolean
  internal_access_label: string

  status?: 'DELETED' | 'STATUS' | 'INTERNAL_ACCESS' | 'HIERARCHY'
}

/** Nível da Hierarquia da Função */
export type Level = {
  name: string
  roles: Role[]
}

export interface Hierarchy {
  id: number
  name: string
  hierarchy_type_id: number
  manual_elements: boolean
}

export interface Role_Hierarchie {
  hierarchy_id: number
  hierarchy__structure_id: number
  role: Role
}

export interface StructureItem {
  id: number
  level: number
  level_label: string
  name: string
  parent_id: number | null
  roles_hierarchies: Role_Hierarchie[]
  // Adicione outras propriedades se existirem no objeto real
}

interface Modifier {
  name: string
}

export interface Schedule {
  id: number
  invalidated_at: string | null
  manual_elements: boolean
  manual_elements_label: string
  modified_by: number
  modifier: Modifier
  schedule: string
  structure: StructureItem[]
}

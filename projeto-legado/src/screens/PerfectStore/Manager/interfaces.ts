export interface DataInterface {
  id?: number | null
  name?: string | null
  status?: 'A' | 'I' | null
  master?: boolean | null
  default_id?: number | null
  internal_access?: boolean | null
  access_level_id?: number | null
  people_count?: number | null
  people_percentage?: number | null
  hierarchy_structure_role_count?: number | null
  roles_menus:
    | {
        id?: number | null
        role_id?: number | null
        menu_id?: number | null
      }[]
    | null
  roles_hierarchies?:
    | {
        id?: number | null
        role_id?: number | null
        hierarchy_id?: number | null
        hierarchy_structure_count?: number | null
      }[]
    | null
  status_label?: string | null
  access_level_label?: string | null
  default?: boolean | null
  default_label?: string | null
  internal_access_label?: string | null
  homepage?: string | null
}

export interface BodyInterface {
  id: number
  active: boolean
  active_jsx: JSX.Element
  name: string
  type: string
  access_level: string
  access_level_id: number
  internal_attributes: string
  internal_attributes_bool: boolean
  representativeness: string
  user_count: number
  hierarchies_ids: number[]
  hierarchy_structure_role_count: number
  homepage: string
  isMaster: boolean
  roles_menus: number[]
}

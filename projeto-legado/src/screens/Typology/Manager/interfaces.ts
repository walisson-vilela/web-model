export interface DataInterface {
  active?: boolean | null
  contractor_id?: number | null
  created_at?: string | null
  created_by?: number | null
  default?: boolean | null
  default_id?: number | null
  deleted?: boolean | null
  deleted_at?: string | null
  deleted_by?: number | null
  id?: number | null
  list?: boolean | null
  modified_at?: string | null
  modified_by?: number | null
  name?: string | null
  recalculate?: number | null
  recovered_at?: string | null
  recovered_by?: number | null
  store_count?: number | null
  store_percentage?: number | null
}

export interface BodyInterface {
  active_jsx: JSX.Element | null
  active?: boolean
  contractor_id: number | null
  created_at: string | null
  created_by: number | null
  default: string | null
  default_id: number | null
  deleted: boolean
  deleted_at: string | null
  deleted_by: number | null
  id: number | null
  list: boolean
  modified_at: string | null
  modified_by: number | null
  name: string | null
  recalculate: number | null
  recovered_at: string | null
  recovered_by: number | null
  store_count: JSX.Element | null
  store_number: number | null
  store_percentage: string | null
}

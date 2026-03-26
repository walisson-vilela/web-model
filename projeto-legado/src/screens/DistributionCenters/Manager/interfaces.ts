export interface DataInterface {
  id?: number | null
  contractor_id?: number | null
  name?: string | null
  active?: boolean | null
  store_id?: number | null
  store_count?: number | null
  category_count?: number | null
  apportionment?: number | null
  created_by?: number | null
  created_at?: string | null
  modified_by?: null | null
  modified_at?: string | null
  deleted?: boolean | null
  deleted_by?: null | null
  deleted_at?: null | null
  recovered_by?: null | null
  recovered_at?: null | null
  stores_one?: {
    id?: number | null
    name?: string | null
    city?: string | null
    state?: string | null
    market_flag?: {
      id?: number | null
      name?: string | null
    } | null
  } | null
  apportionment_name?: string | null
}

export interface BodyInterface {
  id: number | null
  name: string | null
  name_jsx: JSX.Element | null
  active: boolean | null
  active_jsx: JSX.Element | null
  flag_name: string | null
  city_name: string | null
  state_name: string | null
  store_id: number | null
  store_count: number | null
  store_count_jsx: number | JSX.Element | null
  apportionment: number | null
  apportionment_name: string | null
  category_count: number | null
  particularities_jsx: string | JSX.Element | null
}

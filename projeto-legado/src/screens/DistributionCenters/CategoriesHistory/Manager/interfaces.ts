export interface DataInterface {
  id?: number | null
  reference?: string | null
  distribution_center_id?: number | null
  apportionment?: number | null
  store_count?: number | null
  category_count?: number | null
  apportionment_name?: string | null
}

export interface BodyInterface {
  id: number | null
  reference: string | null
  reference_txt: string | null
  distribution_center_id: number | null
  apportionment: number | null
  store_count: number | null
  store_count_jsx: number | JSX.Element | null
  category_count: number | null
  particularities_jsx: JSX.Element | string | null
  apportionment_name: string | null
  apportionment_jsx: JSX.Element | string | null
  canReprocess: boolean
}

export interface DataInterface {
  id?: number | null
  status?: string | null
  name?: string | null
  default_id?: number | null
  default?: boolean | null
  default_label?: string | null
  store_percentage?: number | null
  store_count?: number | null
}

export interface BodyInterface {
  id: number | null
  status: boolean | null
  status_jsx: string | JSX.Element | null
  name: string | null
  default_id: number | null
  default: boolean | null
  default_label: string | null
  store_percentage: number | null
  store_percentage_txt: string | null

  store_count: number | null
  store_count_jsx: string | JSX.Element | null
}

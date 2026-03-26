
export interface DataInterface {
  id: number
  status: number | null
  active_jsx: JSX.Element | null
  epi_type_id: number | null
  epi_type: { id: number; name: string } | null
  epi_expiration_months: JSX.Element | null
  size: string | null
  inventory_min: number | null
  inventory_count: number | null
  inventory_manual_decrease: number | null
}

export interface BodyInterface {
  id: number
  active: number | null
  active_jsx: JSX.Element | null
  epi_type_id: number | null
  size: string | null
  epi_expiration_months: JSX.Element | null
  inventory_min: number | null
  inventory_count: number | null
  inventory_manual_decrease: number | null
}



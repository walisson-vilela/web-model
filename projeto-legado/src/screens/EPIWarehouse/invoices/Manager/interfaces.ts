
export interface BodyInterface {
  id: number
  epi_type_id: number
  epi_type: string | null
  obs: string
  ca_code: JSX.Element | null
  ca_code_expiration:string
  number: string
  date: Date | null
  date_formatted: JSX.Element | null
  supplier: string
  epi_count_value: string | null
  epi_count: JSX.Element;
  epis_invetory_add: []
}

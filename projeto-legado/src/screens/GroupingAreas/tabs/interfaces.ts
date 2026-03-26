export interface DataInterface {
  id?: string | null
  hierarchy_id?: number | null
  country_id?: number | null
  name?: string | null
  active?: boolean | null
  area_count?: number | null
  route_count?: number | null
  store_count?: number | null
  user_count?: number | null
  countries?: [
    {
      id?: number | null
      name?: string | null
    },
  ]
  country?: {
    id?: number | null
    name?: string | null
  } | null
  regions?:
    | {
        id?: number | null
        name?: string | null
        active_text?: string | null
        system_text?: string | null
        has_particularities?: boolean | null
        has_particularities_text?: string | null
      }[]
    | null
  active_text?: string | null
}

export interface BodyInterface {
  id: string
  status: boolean | null
  status_jsx: JSX.Element | null
  name: string | null
  country: string | null
  country_id: number | null
  hierarchy_id: number
  regions: number[] | null
  area_count: number | null
  route_count: number | null
  store_count: number | null
  user_count: number | null
}

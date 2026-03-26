export interface DataInterface {
  active?: number | null
  approved?: string | null
  checkouts?: string | null
  city?: string | null
  city_id?: number | null
  classification?: string | null
  code?: string | null
  company_name?: string | null
  contractor_id?: number | null
  covered?: boolean | null
  document?: string | null
  formatted_address?: string | null
  id?: number | null
  inscest?: string | null
  nickname?: string | null
  segment?: {
    id?: number | null
    name?: string | null
  }
  address?: {
    formatted: string
    postal_code: string
  }
  stores_contractor: { segment: { id: number; name: string } }
  segment_id?: number | null
  source?: string | null
  state?: string | null
  sublocality?: string | null
  time_attendance_avg?: number | null
  typology_id?: number | null
  validated?: string | null
}

export interface BodyInterface {
  id: number | null
  pdv: string | null
  address: string | null
  segment_id: number | null
  segment: string | null
}

export interface DataBasics {
  id: number
  default_id: number | null
  name: string
  count: number
}

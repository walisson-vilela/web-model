export interface DataInterface {
  id?: number | null
  active?: number | null
  contractor_id?: number | null
  formatted_address?: string | null
  document?: string | null
  name?: string | null
  validated?: string | null
  covered?: boolean | null
  inscest?: string | null
  approved?: string | null
  checkouts?: string | null
  source?: string | null
  classification?: string | null
  company_name?: string | null
  time_attendance_avg?: number | null
  code?: string | null
  city_id?: number | null
  typology_id?: number | null
  segment_id?: number | null
  sublocality?: string | null
  city?: string | null
  state?: string | null
  typology?: {
    id?: number | null
    name?: string | null
    default_id?: number | null
  }
  segment?: {
    id?: number | null
    name?: string | null
  }
  address?: { formatted: string; postal_code: string }
  stores_contractor?: {
    nickname?: string
    segment?: {
      id?: number
      name?: string
    }
    typology?:{
      default?:boolean
      default_id?:number​​​​​
      default_text?:string
      id?: number
      name?: string
    }
  }
}

export interface BodyInterface {
  id: number | null
  pdv: string | null
  address: string | null
  segment: string | null
  typology: string | null
}

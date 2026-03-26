export interface DataInterface {
  id: number
  name: string
  frequency: string
  cycle: number
  created_at: string
  type: string
  validity_start: string
  validity_end: string | null
  formatted_created_by: string | null
  frequency_days: number[] | null
  frequency_fortnights: number[] | null
}

export interface FormData {
  name: string
  frequency: string
  type: boolean
  validity: string
}

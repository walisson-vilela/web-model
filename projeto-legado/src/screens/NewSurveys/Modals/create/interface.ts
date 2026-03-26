export interface CreateSurveyFormData {
  pilar: string | number
  name: string
  behavior: string
  status: string
  mandatory: string
  frequency: string
  frequencyCicle?: number
  frequencyDays?: number[]
  validity: string
  validityStart: string
  validityEnd: string
}

export interface CopyDetailsInterface {
  name?: string | null
  frequency?: string | null
  type?: string | null
  cycle?: number | null
  validity_start?: string | null
  validity_end?: string | null
  hierarchy_id?: number | null
  status?: string | null
  action?: string | null
  forms?: any[] | null
  frequency_days?: any[] | null
  frequency_fortnights?: any[] | null
  brands?: any[] | null
  categories?: any[] | null
  market_chains?: any[] | null
  market_flags?: any[] | null
  market_groups?: any[] | null
  peoples?: any[] | null
  product_lines?: any[] | null
  products?: any[] | null
  regions?: any[] | null
  roles?: any[] | null
  segments?: any[] | null
  stores?: any[] | null
  sub_categories?: any[] | null
  suppliers?: any[] | null
  typologies?: any[] | null
  hierarchy_elements?: any[] | null
  sublocalities?: any[] | null
  states?: any[] | null
  cities?: any[] | null
}

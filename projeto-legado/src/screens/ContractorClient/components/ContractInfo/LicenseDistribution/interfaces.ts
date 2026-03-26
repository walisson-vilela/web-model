export interface DataInterface {
  id?: string | null
  reserved?: number | null
  consumed?: number | null
  consumed_percent?: number | null
  hierarchy_id?: number | null
  contractor_license: {
    id?: string | null
    contractor?: {
      id?: number | null
      account_id?: number | null
      nickname?: string | null
    } | null
  }
  hierarchy?: {
    id?: number | null
    name?: string | null
  } | null
}

export interface BodyInterface {
  id: number | null
  nickname: string | null
  hierarchies: string | null
  reserved: number | null
  consumed: number | null
  consumed_percent: string | null
}

export interface DataBasics {
  id: number
  type: number
  type_text: string
  total: number
  reserved: number
  consumed: number
}

export interface DataInterface {
  store: {
    id?: number | null
    name?: string | null
    formatted_address?: string | null
    typology?: {
      name: string | null
    }
    segment?: {
      name: string | null
    }
  }
}

export interface BodyInterface {
  id: number | null
  name: string | null
  formatted_address: string | null
  typology_name: string | null
  segment_name: string | null
}

interface CollectedRegistries {
  connections: number
  coordinates: number
  id: number
  images: number
  people_id: number
  registries: number
}
export interface DataInterface {
  model: string | null
  display: string | null
  device: string | null
  created_at: string | null
  battery_duration: string | null
  average_consumption: number | null
  collected_registries: CollectedRegistries[]
  applications_count: number | null
  battery_levels: DataBattery[]
}

export interface DataBattery {
  mobile_date: string | null
  activity_status: number | null
  battery_level: string | null
  battery_consumption: string | null
}

export interface BodyBattery {
  mobile_date: string
  activity_status: JSX.Element
  battery_level: string
  battery_consumption: string
}

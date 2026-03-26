export interface AttempsData {
  id: number
  store_name: string
  store_lat: number
  store_lng: number
  store_radius: number
  formatted_address: string
  attempt_radius: number
  attempt_lat: number
  attempt_lng: number
  attempt_distance: number
  data_attempt: string
}

export interface ComponentProps {
  provider: 'checkin' | 'checkout'
  id: number
}

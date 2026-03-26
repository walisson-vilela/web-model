export interface ComponentProps {
  static_attendences_id: number
  type: 'check_in' | 'check_out'
}
export interface DataInterface {
  id: number
  people_id: number
  store_name: string
  store_id: number
  formatted_address: string
  store_lat: number
  store_lng: number
  store_radius: number
  check_in_lat: number
  check_in_lng: number
  check_in_radius: number
  check_in_type: number
  check_in_type_srt: string
  check_in_photo: string
  check_out_lat: number
  check_out_lng: number
  check_out_radius: number
  check_out_type: number
  check_out_type_srt: string
  check_out_photo: null | string
  people: {
    id: number
    name: string
    avatar: {
      id: number
      file: null | any
    }
    people_id_name: string
  }
}

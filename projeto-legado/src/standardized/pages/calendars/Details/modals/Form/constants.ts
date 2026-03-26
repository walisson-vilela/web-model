import type { Value } from './types'

export const defaultValue: Omit<Value, 'type'> = {
  // Step1
  name: '',
  check_in_required: false,
  postal_code: '',
  street_type: '',
  street_address: '',
  street_number: '',
  complement: '',
  sublocality: '',
  city: '',
  state: '',
  geolocation_at: null,
  geolocation_by_id: null,
  geolocation_by_name: null,
  lat: '',
  lng: '',
  radius: 50,
  // Step2
  events: [],
  // Step3
  regions: [],
  cities: [],
  states: [],
  // Step3
  teams: [],
  users: [],
}

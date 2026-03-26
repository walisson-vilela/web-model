export interface DataInterface {
  id: number | null
  active: number | boolean | string | null
  contractor_id: number | null
  formatted_address: string | null
  document: string | null
  name: string | null
  pdv: string | null
  validated: string | null
  covered: boolean | null
  inscest: string | null
  approved: string | null
  checkouts: string | null
  source: string | null
  classification: string | null
  company_name: string | null
  time_attendance_avg: number | null
  code: string | number | null
  city_id: null
  typology_id: number | null
  segment_id: number | null
  sublocality: string | null
  city: string | null
  state: string | null
  market: {
    id: number | null
    name: string | null
  } | null
  typology: {
    id: number | null
    name: string | null
    default_id: null
  } | null
  market_chain: {
    id: number | null
    name: string | null
  } | null
  market_flag: {
    id: number | null
    name: string | null
  } | null
  segment: {
    id: number | null
    name: string | null
  } | null
}

export interface BodyInterface {
  id: number | null
  status: boolean | null
  status_jsx: JSX.Element | string | null
  validated: string | null
  validated_jsx: string | null
  covered: boolean | null
  covered_jsx: string | null
  code: string | null
  name: string | null
  name_jsx: JSX.Element | string | null
  formatted_address: JSX.Element | null
  flag_name: JSX.Element | null
  segment_name: string | null
  typology_name: string | null
}

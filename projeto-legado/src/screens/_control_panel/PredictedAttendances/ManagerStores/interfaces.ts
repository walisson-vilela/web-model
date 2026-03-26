export interface DataInterface {
  id: number
  people_id: number
  store_id: number
  attendance_status: string
  route_name: string
  store_name: string
  store_validated: string
  attendance_origin: string
  duration_planned: string
  check_in: string
  check_out: string
  duration: string
  people_name: string
  check_in_type: number
  check_in_attempts_count: number
  check_out_type: number
  check_out_attempts_count: number
  justify_at: string
  people_justify_name: string
  reason: string
}

export interface BodyInterface {
  id: number
  people_id: number
  attendance_status: string | null
  attendances_status_jsx: JSX.Element | null
  route_name: string | null
  store_name: string | null
  store_name_jsx: JSX.Element | null
  store_id: number
  store_validated: string | null
  attendance_origin: string | null
  duration_planned: string | null
  check_in: string | null
  check_in_jsx: JSX.Element | null
  check_out: string | null
  check_out_jsx: JSX.Element | null
  duration: string | null
  people_name: string | null
  people_name_jsx: JSX.Element | null
  check_in_type: number | null
  check_in_attempts_count: number | null
  check_out_type: number | null
  check_out_attempts_count: number | null
  justify_at: string
  people_justify_name: string
  reason: string
}

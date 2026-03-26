export interface DataInterface {
  people_id: number
  active_status: string
  people_name: string
  route_name: string
  realized_planned: string
  added: number
  justified: number
  min_check_in: string
  max_check_out: string
  attendance_performance: number
  punctuality_performance: number
}

export interface BodyInterface {
  people_id: number
  active_status?: string
  people_name: string
  people_name_jsx?: JSX.Element | null
  route_name: string
  realized_planned: string
  realized_planned_jsx: JSX.Element | null
  added: number
  added_jsx: JSX.Element | null | string
  justified: number
  justified_jsx: JSX.Element | null | string
  min_check_in: string
  max_check_out: string
  attendance_performance: number
  attendance_performance_jsx: JSX.Element | null | string
  punctuality_performance: number
  punctuality_performance_jsx: JSX.Element | null | number
}

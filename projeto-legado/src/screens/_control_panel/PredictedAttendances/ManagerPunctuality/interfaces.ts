export interface DataInterface {
  punctuality_status: string
  store_name: string
  segment_name: string
  route_name: string
  people_name: string
  supervisor_name: string
  planned_time: string
  realized_time: string
}

export interface BodyInterface {
  punctuality_status: string
  punctuality_status_jsx: JSX.Element | null
  store_name: string
  segment_name: string
  route_name: string
  people_name: string
  supervisor_name: string
  planned_time: string
  realized_time: string
}

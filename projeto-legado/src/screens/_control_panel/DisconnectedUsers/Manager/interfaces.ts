export interface DataInterface {
  people_name: string
  role_name: string
  active: string
  supervisor_name: string
  supervisor_hierarchy: string
  attendance_started: string
  last_connection: string
  disconnected_time: string
  classification: string
}

export interface BodyInterface {
  people_name: string
  role_name: string
  active: string
  active_jsx: JSX.Element | null
  supervisor_name: string
  supervisor_hierarchy: string
  attendance_started: string
  last_connection: string
  disconnected_time: string
  classification: string
}

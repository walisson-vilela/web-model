export interface DataInterface {
  people_name: string
  role_name: string
  active_status: string
  supervisor_name: string
  supervisor_hierarchy: string
  connection_type: string
  notification_date: string
  images_count: number
  data_count: number
  connection_level_status: string
}

export interface BodyInterface {
  people_name: string
  role_name: string
  active_status: JSX.Element
  supervisor_name: string
  supervisor_hierarchy: string
  connection_type: string
  notification_date: string
  images_count: number
  data_count: number
  connection_level_status: JSX.Element
}

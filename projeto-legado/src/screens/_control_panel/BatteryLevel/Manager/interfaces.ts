export interface DataInterface {
  people_name: string
  role_name: string
  active_status: string
  supervisor_name: string
  supervisor_hierarchy: string
  first_battery_day: string
  last_battery_day: string
  average_consumption_avg: string
  activity_status_srt: string
}

export interface BodyInterface {
  people_name: string
  role_name: string
  active_status: string
  active_status_jsx: JSX.Element
  supervisor_name: string
  supervisor_hierarchy: string
  first_battery_day: string
  last_battery_day: string
  average_consumption_avg: string
  activity_status_srt: string
  activity_status_srt_jsx: JSX.Element
}

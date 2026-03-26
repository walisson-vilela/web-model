export interface DataInterface {
  id?: number | null
  name?: string | null
  active?: number | null
  formatted_address?: string | null
  duration_average?: string | number | null
  duration_goal?: string | number | null
  store_goal_count?: string | number | null
  store_percentage?: string | number | null
  recalculate?: number | null
  store_statistic_attendance_id?: string | number | null
}

export interface BodyInterface {
  id: number | null
  name: string | null
  active: boolean | null
  formatted_address: string | null
  duration_average: number | null
  duration_average_txt: string | JSX.Element | null
  duration_goal: number | null
  duration_goal_jsx: JSX.Element | null
  store_goal_count: number | null
  store_percentage: number | null
  recalculate: number | null
  store_statistic_attendance_id: number | null
}

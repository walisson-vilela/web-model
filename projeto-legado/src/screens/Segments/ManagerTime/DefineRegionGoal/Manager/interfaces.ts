export interface DataInterface {
  id?: number | null
  name?: string | null
  active?: boolean | null
  store_count?: number | null
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
  store_count: number | null
  store_count_jsx: number | JSX.Element | null
  duration_average: number | null
  duration_average_txt: string | null
  duration_goal: number | null
  duration_goal_jsx: JSX.Element | null
  store_goal_count: number | null
  store_percentage: number | null
  store_percentage_jsx: string | JSX.Element | null
  recalculate: number | null
  store_statistic_attendance_id: number | null
}

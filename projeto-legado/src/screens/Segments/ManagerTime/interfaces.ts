export interface DataInterface {
  id?: number
  name?: string | null
  status?: string | null
  store_count?: number | null
  duration_average?: number | null
  duration_goal?: number | null
  store_goal_count?: number | null
  store_percentage?: number | null
  particularities?: number | null
  region_particularities: number | null
  store_particularities: number | null
  role_particularities: number | null
  recalculate?: number | null
  store_statistic_attendance_id?: number | null
}

export interface BodyInterface {
  id: number
  name: string | null
  status: string | null
  store_count: number | null
  store_count_jsx: JSX.Element | number | null
  duration_average: number | null
  duration_average_txt: string | null
  duration_goal: number | null
  duration_goal_jsx: JSX.Element
  store_goal_count: number | null
  store_goal_count_txt: string | JSX.Element | null
  store_percentage: number | null
  store_percentage_txt: string | JSX.Element | null
  particularities: number | null
  region_particularities: number | null
  store_particularities: number | null
  role_particularities: number | null
  particularities_jsx: string | JSX.Element | null
  recalculate: number | null
  store_statistic_attendance_id: number | null
}

export interface SegmentGoal {
  id: number
  goal: number
  store_statistic_attendance_id: number | null
  region_id?: number
  store_id?: number
  role_id?: number
}

export interface DurationGoal {
  [id: number]: string
}

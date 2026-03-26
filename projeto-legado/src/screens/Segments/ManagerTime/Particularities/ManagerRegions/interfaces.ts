export interface DataInterface {
  id?: number | null
  name?: string | null
  segment_id?: number | string | null
  duration_average?: number | string | null
  duration_goal?: number | string | null
}

export interface BodyInterface {
  id: number | null
  name: string | null
  segment_id: number | null
  duration_average: number | null
  duration_average_txt: string | null
  duration_goal: number | null
  duration_goal_txt: string | null
}

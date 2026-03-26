export interface DataInterface {
  date: string | null
  people_id: number | null
  people_name: string | null
  supervisor: string | null
  route_name: string | null
  status: number | null
  displacement_count: number | null
  distance_travel_planned: number | null
  distance_travel: number | null
  duration: number | null
  duration_planned: number | null
  speed_planned: number | null
  speed: number | null
}

export interface BodyInterface {
  status: JSX.Element | null //status
  people_name: string
  supervisor: string | null // supervisor
  displacement_count: number | null
  route_name: string
  distance_travel_planned: number | null
  distance_travel_planned_jsx: JSX.Element | string | null | number
  distance_travel: number
  distance_travel_jsx: JSX.Element | null
  duration_planned: number
  duration_planned_jsx: JSX.Element | string
  speed_planned: number
  speed_planned_jsx: JSX.Element | string | number | null
  speed: number
  speed_jsx: JSX.Element | string | null
}

export interface DataInterface {
  id?: string | null
  status?: string | null
  store_id?: string | null
  store_name?: string | null
  segment_id?: string | null
  segment_name?: string | null
  segment_time?: string | null
  route_name?: string | null
  people_id?: string | null
  people_name?: string | null
  supervisor_id?: string | null
  supervisor_name?: string | null
  window_planned?: string | null
  window_performed?: string | null
}

export interface BodyInterface {
  id: number | null
  status: JSX.Element | null
  store_id: number | null
  store_name: JSX.Element | null
  segment_id: number | null
  segment_name: string | null
  segment_time: string | null
  route_name: string | null
  people_id: number | null
  people_name: JSX.Element | null
  supervisor_id: number | null
  supervisor_name: string | null
  window_planned: string | null
  window_performed: string | null
}

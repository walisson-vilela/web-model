export interface DataInterface {
  id: number
  store_id: number
  store_name: string
  segment_id: number
  segment_name: string
  route_id: number
  route_name: string
  people_id: number
  people_name: string
  supervisor: string
  date: string
  justify_name: string
  week_day: number
}

export interface BodyInterface {
  id: number
  store_name: string
  segment_name: string
  route_name: string
  people_name: string
  supervisor: string
  week_day: number
  week_day_jsx: JSX.Element | string | number | null

  justify_name: string
}
/*
export interface DataInterface {
  id?: string | null;
  route_name?: string | null;
  store_id?: string | null;
  store_name?: string | null;
  segment_id?: string | null;
  segment_name?: string | null;
  date?: string | null;
  people_id?: string | null;
  people_name?: string | null;
  supervisor_name?: string | null;
  justify_name?: string | null;
  day_visit?: string | null;
}

export interface BodyInterface {
  id: number | null;
  route_name: string | null;
  store_id: number | null;
  store_name: JSX.Element | null;
  segment_id: number | null;
  segment_name: string | null;
  date: string | null;
  people_id: number | null;
  people_name: JSX.Element | null;
  supervisor_name: string | null;
  justify_name: string | null;
  day_visit: string | null;
}

*/

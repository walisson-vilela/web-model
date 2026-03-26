export interface DataInterface {
  id: number
  store_name: string
  schedule: string
  status: string
  window_planned: string
  window_performed: string
}

export interface BodyInterface {
  store_name: string
  schedule: string
  status: string
  status_jsx: JSX.Element
  window_planned: string
  window_performed: string
}

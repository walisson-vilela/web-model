export interface DataInterface {
  date: string
  people_id: number
  people_name: string
  supervisor: string
  route_name: string
  status: number
  attendances_count: number
  planned_count: number
  added: number
  in_progress: number
  justified: number
  realized: number
  distance_travel_planned: number
  distance_travel: number
}

export interface BodyInterface {
  status: number // status
  status_jsx: JSX.Element | null
  people_name: string // executor
  supervisor: string // supervisor
  route_name: string // Roteiro
  attendances_count: number // atendimentos previstos.
  added: number // Atendimentos adicionados
  realized: number // Atendimentos realizados.
  distance_travel_planned: number
  distance_travel_planned_jsx: JSX.Element | string | number | null
  distance_travel: number
  distance_travel_jsx: JSX.Element | string | number | null
}

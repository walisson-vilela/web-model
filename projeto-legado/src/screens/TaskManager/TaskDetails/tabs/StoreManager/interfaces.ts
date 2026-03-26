export interface DataInterface {
  id?: number | null
  name?: string | null
  chain_name?: string | null
  route_name?: string | null
  region_name?: string | null
  executor_name?: string | null
  role_name?: string | null
  visit_count?: string | null
  task_percent?: number | null
  reason_not_concluded?: string | null
}

export interface BodyInterface {
  id: number | null
  name: string | null
  chain_name: string | null
  route_name: string | null
  region_name: string | null
  executor_name: string | null
  role_name: string | null
  visit_count: string | null
  task_percent: string | null
  reason_not_concluded: string | null
}

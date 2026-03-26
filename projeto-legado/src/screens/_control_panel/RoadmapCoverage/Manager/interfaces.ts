export interface DataInterface {
  people_name?: string | null
  role_name?: string | null
  inactivation_reason_name?: string | null
  supervisor_name?: string | null
  route_name?: string | null
  region_name?: string | null
  active?: 'Ativo' | 'Inativo (Temporário)' | 'Inativo (Definitivo)' | null
  has_customer_list?: string | null
  has_planned?: string | null
}

export interface BodyInterface {
  people_name: string | null
  role_name: string | null
  active: 'Ativo' | 'Inativo (Temporário)' | 'Inativo (Definitivo)' | null
  active_jsx: JSX.Element | null
  inactivation_reason_name: string | null
  supervisor_name: string | null
  route_name: string | null
  has_customer_list: string | null
  has_planned: string | null
}

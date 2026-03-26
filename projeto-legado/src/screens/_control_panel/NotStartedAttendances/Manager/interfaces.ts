export interface DataInterface {
  people_name: string
  role_name: string
  active_status: string
  supervisor_name: string
  supervisor_hierarchy: string
  route_name: string
  has_customer_list: string
  has_planned: string
}

export interface BodyInterface {
  people_name: string
  role_name: string
  active_status: string
  active_jsx: JSX.Element
  supervisor_name: string
  supervisor_hierarchy: string
  route_name: string
  has_customer_list: string
  has_planned: string
}

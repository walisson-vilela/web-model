export interface DataInterface {
  id: number | null
  people_id: number | null
  people_name: string | null
  role_id: number | null
  role_name: string | null
  active: number | null
  approval_status: number | null
  user_inactivation_id: number | null
  permanent_inactive: boolean | null
  inactivation_reason: null | string
  supervisor_name: null | string
  supervisor_hierarchy: null | number
  feeling_id: number
  feeling_name: string | null
  note: string | null
  mobile_date: string | null
  classification: number | null
}

export interface BodyInterface {
  id: number | null
  active: number
  people_name: string
  role_name: string
  status: number
  status_jsx: JSX.Element | null
  supervisor_name: string
  supervisor_hierarchy: string
  mobile_date: string
  mobile_date_jsx: JSX.Element | null
  inactivation_reason: string
  feeling_id: number
  classification: string
  classification_jsx: JSX.Element | null
  note: string
  note_jsx: JSX.Element | null
}

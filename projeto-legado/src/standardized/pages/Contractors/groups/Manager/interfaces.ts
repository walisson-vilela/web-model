export interface DataInterface {
  id: number | null
  status: number
  nickname: string | null
  shared: boolean | null
  type: string | null
  contractor_people_count: number | null
  contractors_subcontractors_count: number | null
  status_label: string | null
  type_label: string | null
  shared_label: string | null
}

export interface BodyInterface {
  active_jsx: JSX.Element
  active: number
  id: number
  name: string | null
  contractors_subcontractors_count: JSX.Element
  contractor_peoples_count: JSX.Element
}

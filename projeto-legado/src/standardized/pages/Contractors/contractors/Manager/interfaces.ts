export interface DataInterface {
  id: number
  status: number | null
  account_id: number | null
  nickname: string | null
  shared: number | null
  type: string | null
  contractor_people_count: number | null
  type_label: string | null
  shared_label: string | null
}

export interface BodyInterface {
  id: number
  account_id: number | null
  active: number | null
  active_jsx: JSX.Element | null
  casual_name: string | null
  account_type: string | null
  master: boolean
  can_group: string | null
  contractor_peoples_count: JSX.Element | null
}

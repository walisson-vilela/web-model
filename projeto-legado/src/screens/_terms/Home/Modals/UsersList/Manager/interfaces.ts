type RoleData = {
  id: number | null
  name: string | null
}

type UserData = {
  active: string | null
}

export interface DataInterface {
  id: number | null
  name: string | null
  term_id: string | null
  accepted: string | null
  access: string | null
  created_at: string | null
  deleted_at: null | any
  role: RoleData
  Users: UserData
  people_id_name: string | null
}

export interface BodyInterface {
  id: number
  user_name: string | null
  active: string | null
  user_name_jsx: JSX.Element | string | null
  role: string
  created_at: string | null
  access: string | null
  accepted: string | null
  download_jsx: JSX.Element | null | string
}

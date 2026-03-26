export interface DataTerm {
  id: number
  system: boolean
  title: string
  content: string
  created_at: string // datetime
  accepted: boolean
  subject: string
  required?: boolean
}

export interface ITokenDecoded {
  iat: number
  iss: number
  payload: ITokenPayload
  url: string
}

interface ITokenPayload {
  access: string
  account: number
  account_master: number
  client: number
  contractor: number
  created_in: number
  password_expiration: boolean | null
  password_expired: boolean
  people: number
  session_id: number
  super_user: boolean
  tmp_password: boolean
  type: string
}

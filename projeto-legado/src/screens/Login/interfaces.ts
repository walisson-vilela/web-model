export interface LoginForm {
  account: string
  username: string
  password: string
  terms: boolean
  keep?: boolean
}

export interface LoginReturn {
  token?: string | null
  fail?: boolean | null
  password_expiration?: number | null
  password_expired?: boolean | null
  tmp_password?: boolean | null
  homepage?: string | null
  terms?: {
    success?: boolean | null
  }
}

export interface ILoginBy {
  id: number | null
  subdomain: string | null
  login_by: string | null
}

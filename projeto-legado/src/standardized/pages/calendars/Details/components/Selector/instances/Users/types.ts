import type { SelectorConfig } from '../../types'

export type User = {
  id: number
  name: string
  role: {
    id: number
    name: string
  }
  person: { registration: string }
  user_id?: number
}

export type Config = SelectorConfig<User>

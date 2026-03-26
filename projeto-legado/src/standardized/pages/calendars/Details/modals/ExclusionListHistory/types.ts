import type { Card, Team, User } from '../../components/types'
import type { ReactState } from '../../types'

export type Value = Pick<Card, 'id' | 'starts_at' | 'ends_at'> & {
  user_count: number
  team_count: number
  // if key exists it should be saved
  users?: User[]
  teams?: Team[]
}

export type Context = {
  value: ReactState<Value>
  loading: ReactState<boolean>
  card: Card
}

export type Pagination = {
  page: number
  last: boolean
  total: number
}

import type { SelectorConfig } from '../../types'

export type Team = {
  id: number
  name: string
  role: {
    id: number
    name: string
  } | null
  hierarchy: {
    id: number
    name: string
  }
  user: {
    id: number
    name: string
  } | null
  child_count: number
  team_id?: number
}

export type Config = SelectorConfig<Team>

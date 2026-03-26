import type { SelectorConfig } from '../../types'

export type State = {
  id: number
  name: string
  short_name: string
  state_id?: number
  country: {
    id: number
    name: string
  }
}

export type Config = SelectorConfig<State>

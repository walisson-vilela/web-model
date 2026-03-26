import type { SelectorConfig } from '../../types'
import type { State } from '../States/types'

export type City = {
  id: number
  name: string
  city_id?: number
  state: Omit<State, 'country'>
  country: State['country']
}

export type Config = SelectorConfig<City>

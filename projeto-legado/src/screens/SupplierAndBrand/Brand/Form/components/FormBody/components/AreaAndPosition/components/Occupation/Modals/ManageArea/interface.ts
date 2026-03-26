import { Rule as GridSelectorRule } from '../../../../../../../../../../../../components/GridSelector/interfaces'

export type Common = {
  id?: number
  foreign_id: number
  name: string
}

export type State = Common & {
  name_short: string
}

export type City = Common & {
  state_name: string
  state_name_short: string
}

export interface Selected {
  states: State[]
  cities: City[]
}

export type Rule = { [K in keyof Selected]: GridSelectorRule }

export type TabComponents = {
  [K in keyof Selected]: React.FunctionComponent<{
    selected: [Selected[K], React.Dispatch<React.SetStateAction<Selected[K]>>]
  }> & {
    label: string
  }
}

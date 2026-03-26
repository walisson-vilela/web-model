import { Rule as GridSelectorRule } from '../../../../../components/GridSelector/interfaces'

export type Common = {
  id?: number
  foreign_id: number
  name: string
}

export type Segments = Common

export type Flags = Common & {
  chain: string
  group: string
}

export interface Selected {
  segments: Segments[]
  market_flags: Flags[]
}

export type Rule = { [K in keyof Selected]: GridSelectorRule }

export type TabComponents = {
  [K in keyof Selected]: React.FunctionComponent<{
    selected: [Selected[K], React.Dispatch<React.SetStateAction<Selected[K]>>]
  }> & {
    label: string
  }
}

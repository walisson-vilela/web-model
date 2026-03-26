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
}

export type Sublocality = City & {
  city_name: string
}

export interface Selected {
  states: State[]
  cities: City[]
  sublocalities: Sublocality[]
}

export type TabComponents = {
  [K in keyof Selected]: React.FunctionComponent<{
    selected: [Selected[K], React.Dispatch<React.SetStateAction<Selected[K]>>]
  }> & {
    label: string
  }
}

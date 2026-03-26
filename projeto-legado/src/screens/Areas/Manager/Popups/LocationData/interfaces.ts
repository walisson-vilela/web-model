export interface RowStates {
  id: number
  name: string
  name_short: string
}
export interface RowCities {
  id: number
  name: string
  state: RowStates
}
export interface RowSublocalities {
  id: number
  name: string
  city: RowCities
}
export type Rows = {
  states: RowStates
  cities: RowCities
  sublocalities: RowSublocalities
}

export interface LocationDataProps<T extends keyof Rows> {
  id: number
  type: T
  title: string
  subtitle: string
  count: number
}

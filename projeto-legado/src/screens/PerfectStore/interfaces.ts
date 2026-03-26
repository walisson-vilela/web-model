type FilterTypes =
  | 'dateInterval'
  | 'status'
  | 'registry'
  | 'team'
  | 'hierarchy'
  | 'segment'
  | 'market'
  | 'region'

export type FiltersOptions = {
  [key in FilterTypes]?: string[]
}

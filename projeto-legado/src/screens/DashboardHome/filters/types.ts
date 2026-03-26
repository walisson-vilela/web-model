export type FilterLabelKey = 'vision' | 'level' | 'area'
export type FilterOrderKey = FilterLabelKey
export type FilterKey = 'vision'

export type FilterOption = {
  value: string | number
  label: string
}

export type FilterState = {
  vision: number
  levelId: number
  levelElementId: number
  areasIds: number[]
  date: string
}

export type Level = {
  id: number
  name: string
}

export type LevelElement = {
  id: number
  levelId: number
  name: string
}

export type Area = {
  id: number
  name: string
}

export type DashboardFiltersContextValue = {
  state: FilterState
  options: Record<'vision', FilterOption[]>
  areas: Area[]
  levels: Level[]
  levelElements: LevelElement[]
  setFilter: (key: FilterKey, value: string | number) => void
  setLevelFilter: (levelId: number, levelElementId: number) => void
  setAreasFilter: (ids: number[]) => void
  setDateFilter: (date: string) => void
  reset: () => void
}

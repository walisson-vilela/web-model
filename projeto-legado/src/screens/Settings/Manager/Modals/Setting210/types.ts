export type Hierarchy<K extends number = number> = {
  id: K
  name: string
  regions: number[]
  states: number[]
}

export type Hierarchies = { [K in number]: Hierarchy<K> }

export type Errors = {
  [K in number]: (keyof Pick<Hierarchy<K>, 'regions' | 'states'>)[]
}

export type Context = {
  hierarchies: [Hierarchies, React.Dispatch<React.SetStateAction<Hierarchies>>]
  setHierarchy: (id: number, hierarchy: React.SetStateAction<Hierarchy>) => void
  setHierarchyValue: <T extends keyof Hierarchy<number>>(
    id: number,
    field: T,
    value: React.SetStateAction<Hierarchy<number>[T]>,
  ) => void
  close: () => void
  loading: boolean
  isDirty: boolean
  errors: Errors
}

export type { SettingComponent } from '../types'

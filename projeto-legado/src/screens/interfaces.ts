import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import { ModalState } from '../components/MwModal'

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
export type UseState<T> = [T, SetState<T>]

export type ObjUseState<T, N extends string = 'value'> = {
  [key in N]: T
} & {
  [key in `set${Capitalize<N>}`]: SetState<T>
}

export interface ManagerProps {
  search: {
    search: string
    setSearch: SetState<string>
  }
  sort: {
    sort: SortState | null
    setSort: SetState<SortState | null>
  }
  appliedFilters: {
    appliedFilters: FiltersInterfaces.AppliedFilter[]
    setAppliedFilters: SetState<FiltersInterfaces.AppliedFilter[]>
  }
  date: {
    date: Date
    setDate: React.Dispatch<React.SetStateAction<Date>>
  }
  dateInterval: {
    dateInterval: [string, string]
    setDateInterval: React.Dispatch<React.SetStateAction<[string, string]>>
  }
  modal: [ModalState, React.Dispatch<React.SetStateAction<ModalState>>]
}

const notImplemented = () => {
  throw new Error('Function not implemented.')
}

export const EmptyManagerProps: ManagerProps = {
  search: {
    search: '',
    setSearch: notImplemented,
  },
  sort: {
    sort: undefined,
    setSort: notImplemented,
  },
  appliedFilters: {
    appliedFilters: [],
    setAppliedFilters: notImplemented,
  },
  date: {
    date: undefined,
    setDate: notImplemented,
  },
  dateInterval: {
    dateInterval: ['', ''],
    setDateInterval: notImplemented,
  },
  modal: [null, notImplemented],
}

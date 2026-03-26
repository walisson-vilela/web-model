import { createContext } from 'react'

import type { ContextInterface } from './interfaces'

const ManagerContext = createContext<ContextInterface>({
  columns: [],
  rows: [],
  hasFilters: false,
  messages: {
    empty: '',
    emptyWithFilters: '',
  },
  selection: undefined,
  sort: {
    sort: null,
    setSort: () => {},
  },
  loading: false,
  paginator: () => {},
  getRowDisabled: () => false,
})

export default ManagerContext

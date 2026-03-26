import { createContext } from 'react'

import { TableSelectorContextProps } from './interfaces'

const TableSelectorContext = createContext<TableSelectorContextProps>({
  selected: null,
  setSelected: () => {},
  rows: [],
  setSearch: () => {},
  loading: false,
  paginator: () => {},
  emptyMessage: 'Nenhum resultado encontrado',
  filters: null,
})

export default TableSelectorContext

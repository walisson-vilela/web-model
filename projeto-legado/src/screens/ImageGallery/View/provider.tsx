import { createContext, useContext, useState } from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import useRouteTabContext from '../../../routes'
import { RouteTabProvider } from '../../../routes/types'
import { numberOrDefault } from '../../../utils/Formatters'

interface Persist {
  id: number | null
  search: [string, React.Dispatch<React.SetStateAction<string>>]
  appliedFilters: [
    FiltersInterfaces.AppliedFilter[],
    React.Dispatch<React.SetStateAction<FiltersInterfaces.AppliedFilter[]>>,
  ]
  columnsPerRow: [number, React.Dispatch<React.SetStateAction<number>>]
  closeTab: (redirect?: string | 0) => void
}

const Context = createContext<Persist>({
  id: null,
  search: ['', () => {}],
  appliedFilters: [[], () => {}],
  columnsPerRow: [3, () => {}],
  closeTab: () => {},
})

export const ImageGalleryProvider: RouteTabProvider<{ id: string }> = (
  props,
) => {
  const [search, setSearch] = useState<string>('')
  const [appliedFilters, setAppliedFilters] = useState<
    FiltersInterfaces.AppliedFilter[]
  >([])
  const [columnsPerRow, setColumnsPerRow] = useState(3)
  const {
    data: { route },
  } = props

  const { close: closeTab } = useRouteTabContext(route)

  return (
    <Context.Provider
      value={{
        id: numberOrDefault(route.match.params.id),
        search: [search, setSearch],
        appliedFilters: [appliedFilters, setAppliedFilters],
        columnsPerRow: [columnsPerRow, setColumnsPerRow],
        closeTab,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
const useImageGalleryContext = () => useContext(Context)

export default useImageGalleryContext

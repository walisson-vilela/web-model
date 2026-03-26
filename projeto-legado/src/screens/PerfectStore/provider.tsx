import { createContext, useContext, useState } from 'react'

import moment from 'moment'

import { RouteTabProvider } from '../../routes/types'
import { useManagerProps } from '../../utils/hooks'
import { EmptyManagerProps, ManagerProps } from '../interfaces'

import { FiltersOptions } from './interfaces'

interface Persist {
  managerProps: ManagerProps
  filters: [
    FiltersOptions,
    React.Dispatch<React.SetStateAction<FiltersOptions>>,
  ]
}

const Context = createContext<Persist>({
  managerProps: EmptyManagerProps,
  filters: [{ dateInterval: [] }, () => {}],
})

export const PerfectStoreProvider: RouteTabProvider = (props) => {
  const { getManagerProps } = useManagerProps(1)
  const [filters, setFilters] = useState<FiltersOptions>({
    dateInterval: [
      moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
      moment().endOf('month').format('YYYY-MM-DD HH:mm:ss'),
    ],
  })

  return (
    <Context.Provider
      value={{
        managerProps: getManagerProps(0),
        filters: [filters, setFilters],
      }}
      children={props.children}
    />
  )
}

const usePerfectStorContext = () => useContext(Context)

export default usePerfectStorContext

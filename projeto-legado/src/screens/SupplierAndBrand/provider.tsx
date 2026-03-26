import React from 'react'

import { RouteTabProvider } from '../../routes/types'
import { useManagerProps } from '../../utils/hooks'
import { EmptyManagerProps, ManagerProps } from '../interfaces'

import { paths } from './tabs'

const Context = React.createContext<{
  managerProps: ManagerProps
  tab: number
}>({
  managerProps: EmptyManagerProps,
  tab: 0,
})

const useContext = () => React.useContext(Context)

export const Provider: RouteTabProvider<{ tab?: string }> = (props) => {
  const {
    data: {
      route: {
        match: { params: routeParams },
      },
    },
  } = props

  const tab = (() => {
    if (!routeParams.tab) return 0
    const tab = paths.indexOf(routeParams.tab)
    return tab < 0 ? 0 : tab
  })()

  const { getManagerProps } = useManagerProps(2)

  const managerProps = getManagerProps(tab)

  return (
    <Context.Provider value={{ tab, managerProps }} children={props.children} />
  )
}

export default useContext

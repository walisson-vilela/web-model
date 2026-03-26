import React from 'react'

import { RouteTabProvider } from '../../../routes/types'
import { useManagerProps } from '../../../utils/hooks'
import { isObject } from '../../../utils/Validators'
import { ManagerProps } from '../../interfaces'

import { tabs } from './constants'

type ContextData = {
  tab: number
  managerProps: ManagerProps
}

const Context = React.createContext({} as ContextData)

const useContext = () => React.useContext(Context)

export const Provider: RouteTabProvider = (props) => {
  const {
    data: {
      route: {
        match: { params: routeParams },
      },
    },
  } = props

  const tab = (() => {
    if (!isObject(routeParams) || !routeParams.tab) return 0
    const tab = tabs.indexOf(routeParams.tab)
    return tab < 0 ? 0 : tab
  })()

  const { getManagerProps } = useManagerProps(2)

  return (
    <Context.Provider
      value={{
        tab,
        managerProps: getManagerProps(tab),
      }}
      children={props.children}
    />
  )
}

export default useContext

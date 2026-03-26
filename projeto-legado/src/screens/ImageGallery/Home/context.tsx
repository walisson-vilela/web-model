import React, { useState } from 'react'

import { RouteTabProvider } from '../../../routes/types'
import { useManagerProps } from '../../../utils/hooks'
import { EmptyManagerProps, ManagerProps } from '../../interfaces'

import tabs from './tabs'

const Context = React.createContext<{
  managerProps: ManagerProps
  activeTab: [number, React.Dispatch<React.SetStateAction<number>>]
}>({
  managerProps: EmptyManagerProps,
  activeTab: [0, () => {}],
})

const useContext = () => React.useContext(Context)

export const Provider: RouteTabProvider = (props) => {
  const { getManagerProps } = useManagerProps(tabs.length)

  const [activeTab, setActiveTab] = useState<number>(0)

  const managerProps = getManagerProps(activeTab)

  return (
    <Context.Provider
      value={{ managerProps, activeTab: [activeTab, setActiveTab] }}
      children={props.children}
    />
  )
}

export default useContext

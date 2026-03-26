import { createContext, useContext, useState } from 'react'

import { RouteTabProvider } from '../../routes/types'
import useManagerProps from '../../utils/hooks/useManagersProps'
import { EmptyManagerProps, ManagerProps } from '../interfaces'

interface Persist {
  managerProps: ManagerProps
  activeTab: [number, React.Dispatch<React.SetStateAction<number>>]
}

const TABS_LENGTH_LIMIT = 3

const Context = createContext<Persist>({
  managerProps: EmptyManagerProps,
  activeTab: [0, () => {}],
})

export const JustificationsProvider: RouteTabProvider = (props) => {
  const [activeTab, setActiveTab] = useState<number>(0)

  const { getManagerProps } = useManagerProps(TABS_LENGTH_LIMIT)

  return (
    <Context.Provider
      value={{
        activeTab: [activeTab, setActiveTab],

        managerProps: getManagerProps(activeTab),
      }}
      children={props.children}
    />
  )
}

const useJustificationsContext = () => useContext(Context)

export default useJustificationsContext

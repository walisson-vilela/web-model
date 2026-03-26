import { createContext, useContext, useEffect, useState } from 'react'

import { RouteTabProvider } from '../../../routes/types'
import { useManagerProps } from '../../../utils/hooks'
import { EmptyManagerProps, ManagerProps } from '../../interfaces'

interface Persist {
  managerProps: ManagerProps
  activeTab: [number, React.Dispatch<React.SetStateAction<number>>]
}

const TABS_LENGTH_LIMIT = 4

const Context = createContext<Persist>({
  managerProps: EmptyManagerProps,
  activeTab: [0, () => {}],
})

export const TaskDetailProvider: RouteTabProvider = (props) => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const params = new URLSearchParams(props.data.route.location.search)

  const { getManagerProps } = useManagerProps(TABS_LENGTH_LIMIT)

  useEffect(() => {
    props.setTab((prev) => ({ ...prev, label: params.get('title') || '-' }))
  }, [params.get('title')])
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

const useTaskDetailContext = () => useContext(Context)

export default useTaskDetailContext

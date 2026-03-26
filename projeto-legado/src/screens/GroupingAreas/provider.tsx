import { createContext, useContext, useEffect, useState } from 'react'

import { RouteTabProvider } from '../../routes/types'
import { useManagerProps } from '../../utils/hooks'
import { EmptyManagerProps, ManagerProps } from '../interfaces'

import { TabsProps } from './interfaces'
import { getHierarchies } from './services'

interface Persist {
  hierarchies: TabsProps[]

  managerProps: ManagerProps

  activeTab: [number, React.Dispatch<React.SetStateAction<number>>]
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const TABS_LENGTH_LIMIT = 3

const Context = createContext<Persist>({
  hierarchies: [],

  managerProps: EmptyManagerProps,

  activeTab: [0, () => {}],
  loading: [true, () => {}],
})

export const GroupingAreasProvider: RouteTabProvider = (props) => {
  const [hierarchies, setHierarchies] = useState<TabsProps[]>([])

  const [activeTab, setActiveTab] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  const { getManagerProps } = useManagerProps(TABS_LENGTH_LIMIT)

  const loadHierarchies = async () => {
    try {
      const hierarchies = await getHierarchies()

      setHierarchies(hierarchies.slice(0, TABS_LENGTH_LIMIT))
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadHierarchies()
  }, [])

  return (
    <Context.Provider
      value={{
        hierarchies,
        activeTab: [activeTab, setActiveTab],
        managerProps: getManagerProps(activeTab),
        loading: [loading, setLoading],
      }}
      children={props.children}
    />
  )
}

const useGroupingAreasContext = () => useContext(Context)

export default useGroupingAreasContext

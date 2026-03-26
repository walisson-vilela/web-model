import React, { useEffect, useState } from 'react'

import { RouteTabProvider } from '../../routes/types'
import { useMultiLoading } from '../../utils/hooks'
import useManagerProps from '../../utils/hooks/useManagersProps'
import { EmptyManagerProps, ManagerProps } from '../interfaces'

import { getHierarchies, getPendingRegions } from './services'
import * as Types from './types'

interface Persist {
  hierarchies: Types.Hierarchy[]
  pendingRegions: Types.Region[]
  loading: boolean
  managerProps: ManagerProps
  activeTab: [number, React.Dispatch<React.SetStateAction<number>>]
}

const TABS_LENGTH_LIMIT = 3

const Context = React.createContext<Persist>({
  hierarchies: [],
  pendingRegions: [],
  loading: true,
  managerProps: EmptyManagerProps,
  activeTab: [0, () => {}],
})

export const Provider: RouteTabProvider = (props) => {
  const [hierarchies, setHierarchies] = useState<Types.Hierarchy[]>([])
  const [pendingRegions, setPendingRegions] = useState<Types.Region[]>([])
  const [activeTab, setActiveTab] = useState<number>(0)
  const [loading, setLoading] = useMultiLoading({
    hierarchies: true,
    pendingRegions: true,
  })

  const { getManagerProps } = useManagerProps(TABS_LENGTH_LIMIT)

  const loadHierarchies = async () => {
    setLoading('hierarchies', true)

    const hierarchies = await getHierarchies()
    setHierarchies(hierarchies.slice(0, TABS_LENGTH_LIMIT))

    setLoading('hierarchies', false)
  }

  const loadPendingRegions = async () => {
    setLoading('pendingRegions', true)

    try {
      const regions = await getPendingRegions()
      setPendingRegions(regions)
    } catch (error) {
      console.error(error)
    }

    setLoading('pendingRegions', false)
  }

  useEffect(() => {
    loadHierarchies()
    loadPendingRegions()
  }, [])

  return (
    <Context.Provider
      value={{
        hierarchies,
        pendingRegions,
        loading: loading.length > 0,
        activeTab: [activeTab, setActiveTab],
        managerProps: getManagerProps(activeTab),
      }}
      children={props.children}
    />
  )
}

const useContext = () => React.useContext(Context)

export default useContext

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { fetchAreas, fetchHierarchies, fetchHierarchyLevels } from './services'
import { toLocalISODate } from '../../utils/date'
import type { Area, Hierarchy, HierarchyLevel } from './types'

type MainHomeContextValue = {
  hierarchies: Hierarchy[]
  levels: HierarchyLevel[]
  areas: Area[]
  loading: {
    hierarchies: boolean
    levels: boolean
    areas: boolean
  }
  selectedHierarchyId: number | null
  selectedLevelIds: number[]
  selectedAreaIds: number[]
  selectedDate: string
  setSelectedHierarchyId: (id: number) => void
  setSelectedLevelIds: (ids: number[]) => void
  setSelectedAreaIds: (ids: number[]) => void
  setSelectedDate: (date: Date) => void
}

const MainHomeContext = createContext<MainHomeContextValue | undefined>(
  undefined,
)

type MainHomeProviderProps = {
  children: React.ReactNode
}

export const MainHomeProvider = ({ children }: MainHomeProviderProps) => {
  const [hierarchies, setHierarchies] = useState<Hierarchy[]>([])
  const [levels, setLevels] = useState<HierarchyLevel[]>([])
  const [areas, setAreas] = useState<Area[]>([])
  const [loading, setLoading] = useState({
    hierarchies: false,
    levels: false,
    areas: false,
  })

  const [selectedHierarchyId, setSelectedHierarchyId] = useState<number | null>(
    null,
  )

  const [selectedLevelIds, setSelectedLevelIds] = useState<number[]>([])
  const [selectedAreaIds, setSelectedAreaIds] = useState<number[]>([])

  const [selectedDate, setSelectedDate] = useState<string>(() =>
    toLocalISODate(new Date()),
  )

  const loadHierarchies = useCallback(async () => {
    setLoading((prev) => ({ ...prev, hierarchies: true }))
    try {
      const data = await fetchHierarchies()
      setHierarchies(data)

      if (data.length > 0) {
        setSelectedHierarchyId((prev) => prev ?? data[0].id)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading((prev) => ({ ...prev, hierarchies: false }))
    }
  }, [])

  const loadLevels = useCallback(async (hierarchyId: number) => {
    setLoading((prev) => ({ ...prev, levels: true }))
    try {
      const data = await fetchHierarchyLevels(hierarchyId)
      setLevels(data)
      setSelectedLevelIds([])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading((prev) => ({ ...prev, levels: false }))
    }
  }, [])

  const loadAreas = useCallback(async (hierarchyId: number) => {
    setLoading((prev) => ({ ...prev, areas: true }))
    try {
      const data = await fetchAreas(hierarchyId)
      setAreas(data)
      setSelectedAreaIds([])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading((prev) => ({ ...prev, areas: false }))
    }
  }, [])

  useEffect(() => {
    loadHierarchies()
  }, [loadHierarchies])

  useEffect(() => {
    if (selectedHierarchyId == null) return
    loadLevels(selectedHierarchyId)
    loadAreas(selectedHierarchyId)
  }, [selectedHierarchyId, loadLevels, loadAreas])

  const handleSetSelectedHierarchyId = (id: number) => {
    setSelectedHierarchyId(id)
  }

  const handleSetSelectedLevelIds = (ids: number[]) => {
    setSelectedLevelIds(ids)
  }

  const handleSetSelectedAreaIds = (ids: number[]) => {
    setSelectedAreaIds(ids)
  }

  const handleSetSelectedDate = (date: Date) => {
    setSelectedDate(toLocalISODate(date))
  }

  return (
    <MainHomeContext.Provider
      value={{
        hierarchies,
        levels,
        areas,
        loading,
        selectedHierarchyId,
        selectedLevelIds,
        selectedAreaIds,
        selectedDate,
        setSelectedHierarchyId: handleSetSelectedHierarchyId,
        setSelectedLevelIds: handleSetSelectedLevelIds,
        setSelectedAreaIds: handleSetSelectedAreaIds,
        setSelectedDate: handleSetSelectedDate,
      }}
    >
      {children}
    </MainHomeContext.Provider>
  )
}

export const useMainHomeContext = () => {
  const context = useContext(MainHomeContext)

  if (!context) {
    throw new Error('useMainHomeContext must be used within MainHomeProvider')
  }

  return context
}

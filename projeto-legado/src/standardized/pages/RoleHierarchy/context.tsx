import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { cloneDeep } from 'lodash'

import { RouteTabProvider } from '../../../routes/types'
import { Modifier } from '../../components/form/components/Footer'

import { getHierarchies, getLevelsAndSchedule, getRoles } from './services'
import { Hierarchy, Level, Role, Schedule } from './types'

interface ContextProps {
  hierarchies: [Hierarchy[], React.Dispatch<React.SetStateAction<Hierarchy[]>>]
  activeTab: [number, React.Dispatch<React.SetStateAction<number>>]
  loading: [
    {
      roles: boolean
      levels: boolean
      hierarchies: boolean
    },
    React.Dispatch<
      React.SetStateAction<{
        roles: boolean
        levels: boolean
        hierarchies: boolean
      }>
    >,
  ]

  roles: [Role[], React.Dispatch<React.SetStateAction<Role[]>>]
  levels: [Level[], React.Dispatch<React.SetStateAction<Level[]>>]
  manualElements: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  isDirty: boolean
  lastModify: Modifier
  schedule: [
    Schedule | null,
    React.Dispatch<React.SetStateAction<Schedule | null>>,
  ]
  search: [string, React.Dispatch<React.SetStateAction<string>>]
  onScrollEnd: () => void
  reloadRoles: () => void
  hierarchy: Hierarchy | null

  loadData: () => Promise<void>
  loadLevels: () => Promise<void>
}

const Context = createContext({} as ContextProps)

const useHierarchyContext = () => useContext(Context)

const getDefaultLevels = (): Level[] => [
  {
    name: '',
    roles: [],
  },
  {
    name: 'Execução',
    roles: [],
  },
]

export const Provider: RouteTabProvider = (props) => {
  const [hierarchies, setHierarchies] = useState<Hierarchy[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [levels, setLevels] = useState<Level[]>(getDefaultLevels)
  const [schedule, setSchedule] = useState<Schedule | null>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [lastModify, setLastModify] = useState<Modifier>({
    at: null,
    name: null,
  })
  const [manualElements, setManualElements] = useState<boolean>(false)
  const [originals, setOriginals] = useState<Level[]>([])

  const [loading, setLoading] = useState({
    roles: false,
    levels: false,
    hierarchies: false,
  })

  const hierarchy = hierarchies[activeTab] ?? null

  const [paginate, setPaginate] = useState({
    search: '',
    page: 1,
    lastPage: false,
    loaded: false,
  })

  const { search } = paginate
  const setSearch: React.Dispatch<React.SetStateAction<string>> = (value) => {
    setLoading((prev) => ({ ...prev, roles: true }))
    try {
      setPaginate((prev) => {
        const search = typeof value === 'function' ? value(prev.search) : value
        return prev.search === search
          ? prev
          : {
              ...prev,
              search,
              page: 1,
              lastPage: true,
              loaded: false,
            }
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading((prev) => ({ ...prev, roles: false }))
    }
  }

  const onScrollEnd = () => {
    setPaginate((prev) =>
      prev.lastPage
        ? prev
        : {
            ...prev,
            page: prev.page + 1,
            lastPage: true,
            loaded: false,
          },
    )
  }

  const reloadRoles = () => {
    setPaginate((prev) => ({
      ...prev,
      page: 1,
      lastPage: true,
      loaded: false,
    }))
  }

  const loadRoles = useCallback(async () => {
    if (paginate.loaded || !hierarchy?.id) return

    setLoading((prev) => ({ ...prev, roles: true }))

    try {
      const except = levels.flatMap((level) =>
        level.roles.map((role) => role.id),
      )

      const { data, pagination } = await getRoles(
        search,
        hierarchy.id,
        paginate.page,
        except,
      )

      setRoles((prev) => (pagination.page === 1 ? data : [...prev, ...data]))
      setPaginate((prev) => ({
        ...prev,
        loaded: true,
        lastPage: !pagination.has_next_page,
      }))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading((prev) => ({ ...prev, roles: false }))
    }
  }, [hierarchy?.id, paginate, levels, search])

  useEffect(() => {
    loadRoles()
  }, [loadRoles])

  const loadData = async () => {
    setLoading((prev) => ({ ...prev, hierarchies: true }))

    try {
      const response = await getHierarchies()
      setHierarchies(response)
    } catch (error) {
      console.error(error)
    }

    setLoading((prev) => ({ ...prev, hierarchies: false }))
  }

  useEffect(() => {
    loadData()
  }, [])

  const loadLevels = useCallback(async () => {
    if (!hierarchy?.id) return
    setLoading((prev) => ({ ...prev, roles: true, levels: true }))

    setPaginate({
      search: '',
      page: 1,
      lastPage: true,
      loaded: true,
    })

    try {
      const { data } = await getLevelsAndSchedule(hierarchy.id)

      setSchedule(data.schedule)

      const levels = [
        ...data.levels,
        ...getDefaultLevels().slice(
          0,
          2 - (data.levels.length > 1 ? 2 : data.levels.length),
        ),
      ]

      setLevels(cloneDeep(levels))
      setOriginals(cloneDeep(levels))

      setLastModify(data.lastModify)

      setPaginate({
        search: '',
        page: 1,
        lastPage: true,
        loaded: false,
      })
    } catch (e) {
      console.error(e)
    }

    setLoading((prev) => ({ ...prev, roles: false, levels: false }))
  }, [hierarchy?.id])

  useEffect(() => {
    loadLevels()
  }, [loadLevels])

  useEffect(() => {
    if (activeTab > hierarchies.length - 1) {
      setActiveTab(0)
      setManualElements(false)
    } else {
      setManualElements(hierarchies[activeTab].manual_elements)
    }
  }, [hierarchies, activeTab])

  useEffect(() => {
    setSearch('')
    setPaginate((prev) => ({
      ...prev,
      page: 1,
      lastPage: false,
      search: search,
    }))
  }, [activeTab])

  const isDirty = useMemo(() => {
    if (hierarchy?.manual_elements !== manualElements) {
      return true
    }

    if (levels.length !== originals.length) {
      return true
    }

    return levels.some((x, i) => {
      if (x.name !== originals[i].name) return true
      if (x.roles.length !== originals[i].roles.length) return true

      return x.roles.some((a) => {
        return !originals[i].roles.some((b) => a.id === b.id)
      })
    })
  }, [hierarchy?.manual_elements, manualElements, levels, originals])

  return (
    <Context.Provider
      value={{
        hierarchies: [hierarchies, setHierarchies],

        loading: [loading, setLoading],
        activeTab: [activeTab, setActiveTab],

        roles: [roles, setRoles],
        levels: [levels, setLevels],
        manualElements: [manualElements, setManualElements],
        isDirty,
        schedule: [schedule, setSchedule],
        search: [search, setSearch],
        onScrollEnd,
        reloadRoles,
        hierarchy,
        loadData,
        loadLevels,
        lastModify,
      }}
      children={props.children}
    />
  )
}

export default useHierarchyContext

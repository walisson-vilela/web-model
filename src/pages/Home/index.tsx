import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { MwButton, MwManager, MwTabs } from '../../../../components'
import type { TabProps, TabShellProps } from '../../../../components/Tabs/interfaces'
import type { ColumnInterface, Row } from '../../../../components/MwManager'
import Toolbar from '../../../../components/Toolbar'
import type {
  AppliedFilter,
  Filter,
} from '../../../../components/MwManager/components/Toolbar/interfaces'
import { PATHS } from '../../../../routes/paths'
import {
  HOME_SCREEN_DEFAULT_PATH,
  findHomeScreenNodeByPath,
} from '../../screens'
import Header from './components/Header'
import Menu from './components/Menu'

import styles from './styles.module.css'

type HomeTabComponentKey = 'HomeScreenTab'

const HOME_TABS_STORAGE_KEY = 'finac.home.tabs.v1'
const HOME_ACTIVE_TAB_STORAGE_KEY = 'finac.home.active-tab.v1'

type HomeTabData = {
  path: string
  title: string
  description: string
}

const homeManagerColumns: ColumnInterface[] = [
  { content: 'Campo', key: 'field', width: 6 },
  { content: 'Valor', key: 'value', width: 10 },
]

const buildHomeManagerRows = (data: HomeTabData): Row[] => [
  { field: 'Título', value: data.title },
  { field: 'Descrição', value: data.description },
  { field: 'Rota', value: data.path },
]

const homeToolbarFilters: Filter[] = [
  {
    label: 'Status',
    name: 'status',
    options: [
      { label: 'Ativo', value: 'ativo' },
      { label: 'Inativo', value: 'inativo' },
    ],
  },
]

const homeScreenHeader = ({ data }: TabShellProps<HomeTabData>) => {
  return (
    <div className={styles.screenHeader}>
      <h1 className={styles.screenHeaderTitle}>{data.title}</h1>
      <p className={styles.screenHeaderDescription}>{data.description}</p>
    </div>
  )
}

const homeScreenTab = MwTabs.buildComponent(({ data }) => {
  const [search, setSearch] = useState('')
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])

  const handleSearchSubmit = async (value: string) => {
    setSearch(value)
    // TODO: buscar os dados no backend usando o valor enviado.
  }

  return (
    <div className={styles.screenBody}>
      <div className={styles.managerFrame}>
        <Toolbar
          filters={{
            filters: homeToolbarFilters,
            appliedFilters,
            setAppliedFilters,
          }}
          search={{
            search,
            setSearch,
            onSubmit: handleSearchSubmit,
          }}
          reloader={() => undefined}
          loading={false}
          except={{
            paginator: true,
            calendar: true,
            calendarInterval: true,
          }}
          borderless
          children={<MwButton content='Novo' size='small' />}
        />
        <MwManager
          columns={homeManagerColumns}
          rows={buildHomeManagerRows(data)}
          hasFilters={false}
          loading={false}
          paginator={() => undefined}
          borderless
        />
      </div>
    </div>
  )
})

const homeTabComponents = MwTabs.mapComponents<HomeTabComponentKey, HomeTabData>({
  HomeScreenTab: homeScreenTab,
})

const getHomeTab = (path: string): TabProps<HomeTabData, HomeTabComponentKey> | null => {
  const screen = findHomeScreenNodeByPath(path)
  if (!screen) return null

  const title = path === HOME_SCREEN_DEFAULT_PATH ? 'Painel de Controle' : screen.label

  return {
    key: path,
    label: title,
    data: {
      path,
      title,
      description: screen.description,
    },
    component: 'HomeScreenTab',
    primary: path === HOME_SCREEN_DEFAULT_PATH,
  }
}

const readStoragePaths = (key: string) => {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : []
  } catch {
    return []
  }
}

const readStoragePath = (key: string) => {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(key)
    return raw && typeof raw === 'string' ? raw : null
  } catch {
    return null
  }
}

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  const currentPath = useMemo(() => {
    if (location.pathname === PATHS.app) return HOME_SCREEN_DEFAULT_PATH

    if (location.pathname.startsWith(`${PATHS.app}/`)) {
      return location.pathname.slice(PATHS.app.length + 1)
    }

    return HOME_SCREEN_DEFAULT_PATH
  }, [location.pathname])

  const [tabs, setTabs] = useState<Array<TabProps<HomeTabData, HomeTabComponentKey>>>(() => {
    const storedPaths = readStoragePaths(HOME_TABS_STORAGE_KEY)
    const restoredTabs = storedPaths.map(getHomeTab).filter(Boolean) as Array<
      TabProps<HomeTabData, HomeTabComponentKey>
    >
    const currentTab = getHomeTab(currentPath)

    if (currentTab && !restoredTabs.some((tab) => tab.data.path === currentPath)) {
      restoredTabs.push(currentTab)
    }

    return restoredTabs.length > 0 ? restoredTabs : currentTab ? [currentTab] : []
  })
  const [activePath, setActivePath] = useState(() => {
    const storedActivePath = readStoragePath(HOME_ACTIVE_TAB_STORAGE_KEY)
    const storedTabs = readStoragePaths(HOME_TABS_STORAGE_KEY)
    const isStoredActiveValid = storedActivePath
      ? storedTabs.includes(storedActivePath)
      : false

    return isStoredActiveValid ? storedActivePath : currentPath
  })

  const activeIndex = useMemo(() => {
    const index = tabs.findIndex((tab) => tab.data.path === activePath)
    return index < 0 ? 0 : index
  }, [activePath, tabs])

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!sidebarOpen) return

      const target = event.target
      if (!(target instanceof Node)) return

      if (sidebarRef.current?.contains(target)) return

      setSidebarOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [sidebarOpen])

  useEffect(() => {
    setTabs((current) => {
      if (current.some((tab) => tab.data.path === currentPath)) return current

      const tab = getHomeTab(currentPath)
      return tab ? [...current, tab] : current
    })
    setActivePath((current) => (current !== currentPath ? currentPath : current))
  }, [currentPath])

  useEffect(() => {
    if (tabs.length === 0) return

    try {
      window.localStorage.setItem(
        HOME_TABS_STORAGE_KEY,
        JSON.stringify(tabs.map((tab) => tab.data.path)),
      )
      window.localStorage.setItem(HOME_ACTIVE_TAB_STORAGE_KEY, activePath)
    } catch {
      // ignore storage failures
    }
  }, [tabs, activePath])

  useEffect(() => {
    if (tabs.length === 0) return

    if (!tabs.some((tab) => tab.data.path === activePath)) {
      setActivePath(tabs[0].data.path)
      navigate(`${PATHS.app}/${tabs[0].data.path}`)
    }
  }, [activePath, tabs, navigate])

  const openTab = (path: string) => {
    const tab = getHomeTab(path)
    if (!tab) return

    setTabs((current) => (current.some((item) => item.data.path === path) ? current : [...current, tab]))
    setActivePath(path)
    navigate(`${PATHS.app}/${path}`)
  }

  const handleSetActive = (index: number, data: HomeTabData) => {
    if (!tabs[index]) return

    setActivePath(data.path)
    navigate(`${PATHS.app}/${data.path}`)
  }

  return (
    <div className={styles.shell}>
      <Header onToggleSidebar={() => setSidebarOpen((current) => !current)} />

      <div className={styles.main}>
        <Menu
          ref={sidebarRef}
          sidebarOpen={sidebarOpen}
          onOpenSidebar={() => setSidebarOpen(true)}
          onNavigateToScreen={openTab}
        />

        <main className={styles.content}>
          <section className={styles.workspace}>
            <MwTabs
              active={[activeIndex, handleSetActive]}
              options={[tabs, setTabs]}
              components={homeTabComponents}
              header={homeScreenHeader}
              delimiter='blue'
              spacing={{ top: '0', right: '0', bottom: '0', left: '0' }}
            />
          </section>
        </main>
      </div>
    </div>
  )
}

export default MainLayout

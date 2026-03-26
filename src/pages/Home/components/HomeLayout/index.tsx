import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Tabs } from '../../../../components'
import type { TabProps, TabShellProps } from '../../../../components/Tabs/interfaces'
import { PATHS } from '../../../../routes/paths'
import {
  HOME_SCREEN_DEFAULT_PATH,
  findHomeScreenNodeByPath,
} from '../../../../pages/Home/screens'
import Header from './components/Header'
import Menu from './components/Menu'

import styles from './styles.module.css'

type HomeTabComponentKey = 'HomeScreenTab'

type HomeTabData = {
  path: string
  title: string
  description: string
}

const homeScreenHeader = ({ data }: TabShellProps<HomeTabData>) => {
  return (
    <div className={styles.screenHeader}>
      <h1 className={styles.screenHeaderTitle}>{data.title}</h1>
      <p className={styles.screenHeaderDescription}>{data.description}</p>
    </div>
  )
}

const homeScreenTab = Tabs.buildComponent(() => {
  return <div className={styles.screenBody} />
})

const homeTabComponents = Tabs.mapComponents<HomeTabComponentKey, HomeTabData>({
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
    const tab = getHomeTab(currentPath)
    return tab ? [tab] : []
  })
  const [activePath, setActivePath] = useState(currentPath)

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
            <Tabs
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

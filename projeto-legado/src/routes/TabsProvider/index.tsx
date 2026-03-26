import React, { useCallback, useEffect, useState } from 'react'

import { RouteComponentProps } from 'react-router'

import { removeTrailingSlash } from '../../utils'
import { TABS_CACHE_KEY } from '../constants'

import {
  getHomePage,
  getInfoAndIndex,
  getKey,
  getLocalStorage,
  setTabsCache,
} from './functions'
import {
  RouteTabContextProps,
  RouteTabProps,
  TabsContextProps,
  TabsProviderPros,
} from './types'

const TabsContext = React.createContext({} as TabsContextProps)

export const useTabsContext = () => React.useContext(TabsContext)

const useRouteTabContext = (
  route: RouteComponentProps,
): RouteTabContextProps => {
  const context = useTabsContext()
  const {
    push,
    tabs: [, setTabs],
  } = context

  const close: RouteTabContextProps['close'] = (redirect) =>
    context.close(route, redirect)

  const setLabel: RouteTabContextProps['setLabel'] = (s) => {
    setTabs((prev) => {
      const result = getInfoAndIndex(route, prev)
      if (!result || result.index < 0) return prev
      const { index } = result

      const label = typeof s === 'function' ? s(prev[index].label) : s
      if (label === prev[index].label) return prev

      const n = [...prev]
      n[index] = { ...n[index], label }

      return n
    })
  }

  const setDirty: RouteTabContextProps['setDirty'] = (s) => {
    setTabs((prev) => {
      const result = getInfoAndIndex(route, prev)
      if (!result || result.index < 0) return prev
      const { index } = result

      const dirty =
        typeof s === 'function' ? s(prev[index].data.dirty === true) : s
      if (dirty === prev[index].data.dirty) return prev

      const n = [...prev]
      n[index] = { ...n[index], data: { ...n[index].data, dirty } }

      return n
    })
  }

  return { push, close, setLabel, setDirty }
}

export const TabsProvider = (props: TabsProviderPros) => {
  const { match, history } = props
  const { path } = match || { path: '' }

  const [tabs, setTabs] = useState<RouteTabProps[]>(() => {
    const { tabs, active } = getLocalStorage(path)
    setTabsCache(tabs, active)
    return tabs
  })

  const [active, setActive] = useState(() => {
    const { tabs, active } = getLocalStorage(path)
    setTabsCache(tabs, active)
    return active
  })

  useEffect(() => {
    const cache = localStorage.getItem(TABS_CACHE_KEY)
    // if there is no cache key, means that it was intentionally removed
    if (cache === null) return
    setTabsCache(tabs, active)
  }, [tabs, active])

  const pushTab = (index: number, data: { route: RouteComponentProps }) => {
    const url = [
      removeTrailingSlash(data.route.location.pathname),
      ...(data.route.location.search ? [data.route.location.search] : []),
    ].join('/')

    history.push(url)
    setActive(index)
  }

  const push: TabsContextProps['push'] = useCallback(
    (route) => {
      const result = getInfoAndIndex(route, tabs)
      if (!result) return
      const { info, index } = result

      if (index > -1) {
        const newtabs = [...tabs]
        newtabs[index] = {
          ...newtabs[index],
          key: getKey[info.by || 'route'](route),
          data: { ...newtabs[index].data, route },
        }
        setTabs(newtabs)
        pushTab(index, newtabs[index].data)
        return
      }

      const { path, ...tabInfo } = info

      const tab = {
        ...tabInfo,
        data: { route },
        key: route.match.url,
      }

      tab.label = Object.entries(route.match.params).reduce(
        (label, [key, value]) => {
          return label.replace(`:${key}`, value as string)
        },
        tab.label,
      )

      setTabs([...tabs, tab])
      pushTab(tabs.length, tab.data)
    },
    [tabs, active],
  )

  const close: TabsContextProps['close'] = useCallback(
    (route, redirect) => {
      const result = getInfoAndIndex(route, tabs)
      if (!result || result.index < 0) return
      const { index } = result

      setTabs((prev) => {
        const news = [...prev]
        news.splice(index, 1)
        return news
      })

      const url = (() => {
        if (redirect === 0 || tabs.length === 1) {
          try {
            return getHomePage()
          } catch (e) {
            console.error(e)
            return undefined
          }
        }

        return redirect
      })()

      if (url !== undefined) {
        history.push(removeTrailingSlash(url))
        return
      }

      if (index === active) {
        const newActive = active > 0 ? active - 1 : active
        pushTab(newActive, tabs[newActive].data)
      } else if (index < active) {
        setActive(active - 1)
      }
    },
    [tabs, active],
  )

  return (
    <TabsContext.Provider
      {...props}
      value={{
        ...props,
        tabs: [tabs, setTabs],
        active: [active, pushTab],
        push,
        close,
        basePath: path,
      }}
    />
  )
}

export default useRouteTabContext

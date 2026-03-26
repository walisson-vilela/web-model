import { isObject } from '../../standardized/utils/validators'
import { getUserCookies, removeTrailingSlash } from '../../utils'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../utils/Formatters'
import RouteList, { RouteListItem } from '../RouteList'
import { TABS_CACHE_KEY } from '../constants'

import { RouteId, RouteTabProps } from './types'

export const getInfoAndIndex = (route: RouteId, tabs: RouteTabProps[]) => {
  let info: RouteListItem

  try {
    info = getInfo(route.match.path)
  } catch (error) {
    console.error(error, route)
    return null
  }

  const index = tabs.findIndex((e) =>
    compare(route, e.data.route, info.by || 'route'),
  )

  return { info, index }
}

export const getKey: {
  [k in 'route' | 'pathname' | 'url']: (x: RouteId) => string
} = {
  route: (x) => {
    return removeTrailingSlash(x.match.path)
  },
  pathname: (x) => {
    return removeTrailingSlash(x.match.url)
  },
  url: (x) => {
    return `${removeTrailingSlash(x.location.pathname)}/${x.location.search}`
  },
}

const compare = (x: RouteId, y: RouteId, by: keyof typeof getKey) => {
  return getKey[by](x) === getKey[by](y)
}

const getInfo = (path: string) => {
  const [prefix, match] = (() => {
    const splitted = path.split('/')
    return [splitted[2], splitted.slice(3).join('/')]
  })()

  const info = RouteList[prefix].find((e) => e.path === match)
  if (!info) {
    throw new Error(`Route "${match}" not found`)
  }

  return info
}

export const getLocalStorage = (
  base: string,
): {
  tabs: RouteTabProps[]
  active: number
} => {
  const value = (() => {
    try {
      return JSON.parse(localStorage.getItem(TABS_CACHE_KEY) || '')
    } catch (e) {
      console.error(e)
      return null
    }
  })()

  if (!isObject(value)) {
    return {
      tabs: [],
      active: 0,
    }
  }

  const tabs = (Array.isArray(value.tabs) ? value.tabs : []).reduce<
    RouteTabProps[]
  >((tabs, persist) => {
    if (!isObject(persist)) return tabs

    let info: RouteListItem
    try {
      info = getInfo(persist.data.route.match.path)
    } catch (e) {
      console.error(persist, e)
      return tabs
    }

    const {
      data: { ...data },
    } = persist
    delete data.dirty

    const tab: RouteTabProps = {
      ...info,
      key: persist.key,
      data,
      label: persist.label,
    }

    return [...tabs, tab]
  }, [])

  return {
    tabs,
    active: numberOrDefault(value.active, 0),
  }
}

export const setTabsCache = (tabs: RouteTabProps[], active: number) => {
  const persist = tabs.map((tab) => {
    const {
      data: { ...data },
    } = tab
    delete data.dirty

    return {
      label: tab.label,
      data,
      key: tab.key,
    }
  })

  localStorage.setItem(
    TABS_CACHE_KEY,
    JSON.stringify({ tabs: persist, active }),
  )
}

export const getHomePage = (): string => {
  const user = getUserCookies()
  if (!isObject(user)) throw new Error('Could not get homepage')
  const homepage = notEmptyStringOrDefault(user.homepage)
  if (homepage === null) throw new Error('Could not get homepage')
  return homepage
}

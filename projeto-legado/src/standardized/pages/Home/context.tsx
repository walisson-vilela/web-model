import React, { useCallback, useEffect } from 'react'

import { getToken, getUserCookies } from '../../../utils'
import { trim } from '../../utils/formatters'

import {
  getContractor,
  getLoggedUser,
  getMenus,
  getUnreadMessages,
} from './services'
import * as T from './types'

type HomeContextType = {
  user: T.User
  refreshUser: () => Promise<void>

  contractor: T.Contractor
  refreshContractor: () => Promise<void>

  menus: T.Item[]
  refreshMenus: () => Promise<void>

  unreadMessages: number
  refreshUnreadMessages: () => Promise<void>

  isLoading: (
    key: 'user' | 'contractor' | 'menus' | 'unreadMessages',
  ) => boolean

  disabled: 'terms' | 'password' | 'auth' | null

  hasMenu: (path: string) => boolean
}

const defaultHomeContext: HomeContextType = {
  user: {
    id: 0,
    name: '',
    username: '',
    role: null,
    avatar: '',
  },
  refreshUser: async () => {},

  contractor: {
    id: 0,
    account_id: 0,
    nickname: '',
    company_name: '',
    document: null,
    avatar: null,
    type: '',
    type_label: '',
  },
  refreshContractor: async () => {},

  menus: [],
  refreshMenus: async () => {},

  unreadMessages: 0,
  refreshUnreadMessages: async () => {},

  isLoading: () => true,
  disabled: null,

  hasMenu: () => false,
}

const HomeContext = React.createContext<HomeContextType>(defaultHomeContext)

const useHomeContext = () => React.useContext(HomeContext)

const useUser = (setLoading: (loading: boolean) => void) => {
  const [user, setUser] = React.useState<HomeContextType['user']>(
    defaultHomeContext.user,
  )

  const refreshUser = async () => {
    setLoading(true)

    try {
      const user = await getLoggedUser()
      setUser(user)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }

  return {
    user,
    refreshUser,
  }
}

const useContractor = (setLoading: (loading: boolean) => void) => {
  const [contractor, setContractor] = React.useState<
    HomeContextType['contractor']
  >(defaultHomeContext.contractor)

  const refreshContractor = async () => {
    setLoading(true)

    try {
      const contractor = await getContractor()
      setContractor(contractor)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }

  return {
    contractor,
    refreshContractor,
  }
}

const useMenus = (setLoading: (loading: boolean) => void) => {
  const [menus, setMenus] = React.useState<HomeContextType['menus']>(
    defaultHomeContext.menus,
  )

  const refreshMenus = async () => {
    setLoading(true)

    try {
      const menus = await getMenus()
      setMenus(menus)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }

  return {
    menus,
    refreshMenus,
  }
}

const useUnreadMessages = (setLoading: (loading: boolean) => void) => {
  const [unreadMessages, setUnreadMessages] = React.useState<
    HomeContextType['unreadMessages']
  >(defaultHomeContext.unreadMessages)

  const refreshUnreadMessages = async () => {
    setLoading(true)

    try {
      const unreadMessages = await getUnreadMessages()
      setUnreadMessages(unreadMessages)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }

  return {
    unreadMessages,
    refreshUnreadMessages,
  }
}

const useDisabled = () => {
  try {
    const token = getToken()

    const cookies = getUserCookies() || {}
    if (cookies.terms === true) return 'terms'

    const {
      payload: { password_expired, tmp_password },
    } = token

    return password_expired || tmp_password ? 'password' : null
  } catch {
    return 'auth'
  }
}

export const HomeProvider = (props: React.PropsWithChildren) => {
  const [loading, setLoading] = React.useState({
    user: true,
    contractor: true,
    menus: true,
    unreadMessages: true,
  })

  const { user, refreshUser } = useUser((user) =>
    setLoading((prev) => ({ ...prev, user })),
  )
  const { contractor, refreshContractor } = useContractor((contractor) =>
    setLoading((prev) => ({ ...prev, contractor })),
  )
  const { menus, refreshMenus } = useMenus((menus) =>
    setLoading((prev) => ({ ...prev, menus })),
  )
  const { unreadMessages, refreshUnreadMessages } = useUnreadMessages(
    (unreadMessages) => setLoading((prev) => ({ ...prev, unreadMessages })),
  )

  useEffect(() => {
    refreshUser()
    refreshContractor()
    refreshMenus()
    refreshUnreadMessages()
  }, [])

  const isLoading: HomeContextType['isLoading'] = React.useCallback(
    (k) => loading[k],
    [loading],
  )

  const disabled = useDisabled()

  const hasMenu: HomeContextType['hasMenu'] = useCallback(
    (path) => {
      path = trim(path, '/')
      return menus.some((i) =>
        (i.children.length > 0 ? i.children : [i]).some((j) =>
          trim(j.target, '/').startsWith(path),
        ),
      )
    },
    [menus],
  )

  return (
    <HomeContext.Provider
      {...props}
      value={{
        user,
        refreshUser,

        contractor,
        refreshContractor,

        menus,
        refreshMenus,

        unreadMessages,
        refreshUnreadMessages,

        isLoading,
        disabled,

        hasMenu,
      }}
    />
  )
}

export default useHomeContext

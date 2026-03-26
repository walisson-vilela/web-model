import type React from 'react'

import { useMemo, useState } from 'react'

import type { AuthContextValue, AuthSession } from './interfaces'
import { clearAuthSession, readAuthSession, writeAuthSession } from './services'
import { AuthContext } from './useAuth'

export const AuthProvider = (props: React.PropsWithChildren) => {
  const [session, setSession] = useState<AuthSession | null>(() =>
    readAuthSession(),
  )

  const value = useMemo<AuthContextValue>(() => {
    return {
      session,
      isAuthenticated: session !== null,
      signIn: (nextSession) => {
        setSession(nextSession)
        writeAuthSession(nextSession)
      },
      signOut: () => {
        setSession(null)
        clearAuthSession()
      },
    }
  }, [session])

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

export default AuthProvider

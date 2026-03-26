import type { AuthSession } from './interfaces'

const STORAGE_KEY = 'finac.auth.session'

const getStorage = (rememberMe: boolean) => {
  return rememberMe ? window.localStorage : window.sessionStorage
}

export const readAuthSession = (): AuthSession | null => {
  if (typeof window === 'undefined') return null

  const stored =
    window.localStorage.getItem(STORAGE_KEY) ||
    window.sessionStorage.getItem(STORAGE_KEY)

  if (!stored) return null

  try {
    return JSON.parse(stored) as AuthSession
  } catch {
    return null
  }
}

export const writeAuthSession = (session: AuthSession) => {
  if (typeof window === 'undefined') return

  clearAuthSession()
  getStorage(session.rememberMe).setItem(STORAGE_KEY, JSON.stringify(session))
}

export const clearAuthSession = () => {
  if (typeof window === 'undefined') return

  window.localStorage.removeItem(STORAGE_KEY)
  window.sessionStorage.removeItem(STORAGE_KEY)
}

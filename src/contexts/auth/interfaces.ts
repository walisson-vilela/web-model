export interface AuthSession {
  accountId: string
  user: string
  rememberMe: boolean
}

export interface AuthContextValue {
  session: AuthSession | null
  isAuthenticated: boolean
  signIn: (session: AuthSession) => void
  signOut: () => void
}

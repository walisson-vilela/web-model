import { createContext } from 'react'

interface ManagerContext {
  handleLoadData: () => Promise<void>
}

export const ManagerProvider = createContext({} as ManagerContext)

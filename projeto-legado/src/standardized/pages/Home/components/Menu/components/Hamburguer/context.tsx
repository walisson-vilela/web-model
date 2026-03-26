import { createContext, useContext } from 'react'

type HamburguerContextData = {
  loading: boolean
  toggle: () => void
}

const HamburguerContext = createContext<HamburguerContextData>(
  {} as HamburguerContextData,
)

const useHamburguerContext = () => useContext(HamburguerContext)

export default useHamburguerContext

export const HamburgerProvider = HamburguerContext.Provider

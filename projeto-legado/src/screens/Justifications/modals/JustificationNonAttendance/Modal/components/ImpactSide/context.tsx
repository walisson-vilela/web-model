import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { JustificationNonAttendanceContext } from '../../../context'
import { GetStoreImpacted } from '../../../services'

import { StoreImpactedProps } from './interfaces'

interface ImpactSideProps {
  storeImpacted: StoreImpactedProps[]
  setStoreImpacted: React.Dispatch<React.SetStateAction<StoreImpactedProps[]>>
  searchStoreImpacted: string
  setSearchStoreImpacted: React.Dispatch<React.SetStateAction<string>>
  loadingStores: boolean
  setLoadingStores: React.Dispatch<React.SetStateAction<boolean>>
}

export const ImpactSideContext = createContext({} as ImpactSideProps)

interface ImpactSideContextProviderProps {
  children: ReactNode
}

export const ImpactSideContextProvider = ({
  children,
}: ImpactSideContextProviderProps) => {
  const { id } = useContext(JustificationNonAttendanceContext)
  const [storeImpacted, setStoreImpacted] = useState<StoreImpactedProps[]>([])
  const [searchStoreImpacted, setSearchStoreImpacted] = useState<string>('')
  const [loadingStores, setLoadingStores] = useState<boolean>(false)

  const getStoresImpacted = useCallback(async () => {
    setLoadingStores(true)
    try {
      const response = await GetStoreImpacted(id, searchStoreImpacted)
      setStoreImpacted(response)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingStores(false)
    }
  }, [searchStoreImpacted])

  useEffect(() => {
    getStoresImpacted()
  }, [searchStoreImpacted])

  return (
    <ImpactSideContext.Provider
      value={{
        loadingStores,
        setLoadingStores,
        searchStoreImpacted,
        setSearchStoreImpacted,
        setStoreImpacted,
        storeImpacted,
      }}
    >
      {children}
    </ImpactSideContext.Provider>
  )
}

import { createContext } from 'react'

import { SortState } from '@mw-kit/mw-manager'

interface ParticularitiesContextInterface {
  // id do canal
  segment_id: number

  // estado controlador do valor do input de pesquisa
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>

  // estado controlador da ordenação
  sort: SortState | null
  setSort: (newState: SortState) => void

  // estado controlador do loading
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>

  // estado controlador da paginação
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>

  // estado controlador do limite da paginação
  isLastPage: boolean
  setIsLastPage: React.Dispatch<React.SetStateAction<boolean>>
}

const ParticularitiesContext = createContext<ParticularitiesContextInterface>({
  // id do canal
  segment_id: 0,

  // estado controlador do valor do input de pesquisa
  search: '',
  setSearch: () => {},

  // estado controlador da ordenação
  sort: null,
  setSort: () => {},

  // estado controlador do loading
  loading: false,
  setLoading: () => {},

  // estado controlador da paginação
  page: 1,
  setPage: () => {},

  // estado controlador do limite da paginação
  isLastPage: true,
  setIsLastPage: () => {},
})

export default ParticularitiesContext

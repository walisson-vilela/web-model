import type { AppliedFilter } from '../interfaces'

export interface AppliedProps {
  /** estado que contem os filtros aplicados */
  appliedFilters: AppliedFilter[]
  /** funcao que ira alterar o estado dos filtros aplicados */
  setAppliedFilters: React.Dispatch<React.SetStateAction<AppliedFilter[]>>
  /** estado do loading do manager */
  loading?: boolean
}

export interface MenuProps extends AppliedProps {
  /** indicador de menu aberto ou fechado */
  open: boolean
}

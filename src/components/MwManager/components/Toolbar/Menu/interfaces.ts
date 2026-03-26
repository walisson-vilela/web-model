import type { AppliedFilter, Filter } from '../interfaces'

export interface MenuProps {
  /** estado que contem os filtros aplicados */
  appliedFilters: AppliedFilter[]
  /** funcao que ira alterar o estado dos filtros aplicados */
  setAppliedFilters: React.Dispatch<React.SetStateAction<AppliedFilter[]>>
  /** lista de filtros */
  filters: Filter[]
  /** estado do loading do manager */
  loading?: boolean
  /** espaco que a lista de filtros deve ter do rodape da pagina, default 8 */
  bottomMargin?: number
}

export type ListProps = MenuProps & {
  /** estado indicador de menu aberto */
  open: boolean
  /** funcao para fechar o menu de filtros */
  setOpen: (open: boolean) => void
}

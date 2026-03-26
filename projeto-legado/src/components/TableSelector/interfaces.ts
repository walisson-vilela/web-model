import { FiltersInterfaces } from '@mw-kit/mw-manager'

interface Pagination {
  /** indice da pagina atual */
  page: number
  /** funcao que ira ser chamada ao chegar no fim do scroll, para passar de pagina */
  setPage: Function
  /** indicador de ultima pagina */
  lastPage: boolean
}

export interface Row<T = any> {
  data: T
  content: any
}

interface Common<T = any> {
  /** item o lista de itens selecionados, para exibir um checkbox de multiplas selecoes, enviar um array,
   * para exibir um radius de selecao unica, enviar apenas 1 valor ou null */
  selected: any[] | any | null
  /** funcao para alterar o valor do(s) item(ns) selecionado(s) */
  setSelected: Function
  /** conteudo das linhas da tabela */
  rows: Row<T>[]
  /** funcao para alterar o estado do valor do input de busca */
  setSearch: React.Dispatch<React.SetStateAction<string>>
  /** exibe um componente de filtros na tela */
  filters?: {
    /** lista de filtros disponiveis */
    filters: FiltersInterfaces.Filter[]
    /** estado que contem a lista de filtros aplicados */
    appliedFilters: FiltersInterfaces.AppliedFilter[]
    /** funcao que altera o estado da lista de filtros aplicados */
    setAppliedFilters: React.Dispatch<
      React.SetStateAction<FiltersInterfaces.AppliedFilter[]>
    >
    /** espaco que a lista de filtros deve ter do rodape da pagina, default 8 */
    bottomMargin?: number
  }
}

export interface TableSelectorProps extends Common {
  /** indicador de loading ativo */
  loading?: boolean
  /** configuracoes de paginacao */
  pagination?: Pagination
  /** mensagem a ser exibida quando nao encontrar nenhum resultado */
  emptyMessage?: string | JSX.Element
}

export interface TableSelectorContextProps extends Common {
  /** indicador de loading ativo */
  loading: boolean
  /** configuracoes de paginacao */
  paginator: Function
  /** mensagem a ser exibida quando nao encontrar nenhum resultado */
  emptyMessage: string | JSX.Element
}

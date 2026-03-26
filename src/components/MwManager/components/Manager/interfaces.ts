import type React from 'react'

import type { Item as DropdownItem } from '../Dropdown/interfaces'

import type { SortState } from './Sort/interfaces'

export type VerticalAligns =
  | 'baseline'
  | 'center'
  | 'end'
  | 'first baseline'
  | 'flex-end'
  | 'flex-start'
  | 'last baseline'
  | 'left'
  | 'right'
  | 'safe'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'
  | 'start'
  | 'stretch'
  | 'unsafe'
  | 'inherit'
  | 'initial'
  | 'unset'

export type ColumnWidth =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16

export interface ColumnInterface {
  /** conteudo da coluna */
  content: string
  /** chave da coluna que sera buscada no body */
  key: string
  // classe html
  className?: string
  /** alinhamento do texto */
  textAlign?: 'center' | 'left' | 'right'
  /** alinhamento vertical da coluna */
  verticalAlign?: VerticalAligns
  /** largura da coluna (grade de 16 colunas) */
  width?: ColumnWidth
  /** tipo da coluna */
  type?: 'string' | 'numeric' | 'date'
  /** nome da chave de ordenacao, se enviado, a coluna permitira ordenacao */
  sortKey?: string
  /** se a coluna deve fazer a elipse do texto, (default true) */
  ellipsis?: boolean
}

export interface SortInterface {
  /** estado das ordenacoes */
  sort: SortState | null
  /** funcao que seta o estado das ordenacoes */
  setSort: (newState: SortState | null) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Row = any

interface Common {
  /** lista de configuracao das colunas */
  columns: ColumnInterface[]
  /** lista de linhas */
  rows: Row[]
  /** indicador de filtros aplicados */
  hasFilters: boolean
  /** indicador de loading ativo */
  loading: boolean
  /** objeto com o estado e a funcao para alterar o estado dos itens selecionados,
   * caso nao seja enviado, os checkboxes nao seram exibidos */
  checkeds?: {
    /** estado que contem as linhas que estao selecionadas */
    checkeds: Row[]
    /** funcao para alterar o estado dos itens selecionados */
    setCheckeds: React.Dispatch<React.SetStateAction<Row[]>>
    /** alinhamento vertical da coluna do checkbox */
    verticalAlign?: VerticalAligns
    /** se o checkbox de marcar todos deve ser escondido */
    hideCheckAll?: boolean
    /** se o checkbox deve ter aparencia de radio */
    asRadio?: boolean
  }
  /** funcao que retorna o conteudo do menu que sera exibido quando clicar no menu de cada linha,
   * caso nao seja enviado, o botao nao sera exibido */
  getItemMenu?: (item: Row) => false | string | JSX.Element | DropdownItem[]
  /** alinhamento vertical da coluna do botao do dropdown */
  itemMenuVerticalAlign?: VerticalAligns
  /** coordenadas da tela, em porcentagem, que o dropdown ira usar pra saber a direcao que ele deve abrir, sendo 50-50 o ponto central exato da tela */
  centerCoodinates?: {
    /** centro 50, default 50 */
    x?: number
    /** centro 50, default 85 */
    y?: number
  }
  /** callback que ira executar para verificar se o item deve estar desabilitado */
  getRowDisabled?: (row: Row) => boolean
  /** indicador se a tabela deve ter cabecalho */
  headerless?: boolean
  /** indicador se a tabela deve ter aparencia de lista */
  list?: boolean
  /** indicador se a tabela deve borda */
  borderless?: boolean
  /** callback que ira executar ao clicar em alguma coluna */
  onClickColumn?: (
    row: [Row, number],
    col: [ColumnInterface, number],
    e: React.MouseEvent<HTMLTableCellElement>,
  ) => void
}

export interface ContextInterface extends Common {
  /** lista de mensagens, caso nao queira usar as mensagens padrao */
  messages: {
    /** mensagem exibida quando nao encontra nenhum resultado */
    empty: string | JSX.Element
    /** mensagem exibida quando nao encontra nenhum resultado, porem, com filtros aplicados */
    emptyWithFilters: string | JSX.Element
  }
  /** objeto com o estado e a funcao para alterar o estado das ordenacoes */
  sort: SortInterface
  /** callback que sera chamada quando o scroll do body chegar ao final */
  paginator: () => void | Promise<void>
  /** callback que ira executar para verificar se o item deve estar desabilitado */
  getRowDisabled: (row: Row) => boolean
}

export interface ManagerProps extends Common {
  /** lista de mensagens, caso nao queira usar as mensagens padrao */
  messages?: {
    /** mensagem exibida quando nao encontra nenhum resultado */
    empty?: string | JSX.Element
    /** mensagem exibida quando nao encontra nenhum resultado, porem, com filtros aplicados */
    emptyWithFilters?: string | JSX.Element
  }
  /** objeto com o estado e a funcao para alterar o estado das ordenacoes */
  sort?: SortInterface
  /** callback que sera chamada quando o scroll do body chegar ao final */
  paginator?: () => void | Promise<void>
  /** indicador de numero da pagina */
  page?: number
  /** funcao para alterar o estado do numero da pagina */
  setPage?: React.Dispatch<React.SetStateAction<number>>
  /**
   * chave de reset para paginação por cursor: ao mudar, o Manager volta o scroll para o topo
   * e reinicia o estado relacionado a seleção/scroll.
   */
  resetKey?: string | number
  /** indicador para manter os itens marcados mesmo apos recarregar os itens */
  keepCheckeds?: boolean
}

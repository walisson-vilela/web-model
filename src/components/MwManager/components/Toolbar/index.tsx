import React from 'react'

import Input from '../../../Input'
import BlankToolbar from '../BlankToolbar'

import { Applied } from './Applied'
import Menu from './Menu'
import PageLoader from './PageLoader'
import Refresh from './Refresh'
import Search from './Search'
import type * as FiltersInterfaces from './interfaces'
import { StyledDate, StyledInterval } from './styled'

interface Except {
  /** botao de carregar proxima pagina */
  paginator?: boolean
  /** botao de recarregar */
  reloader?: boolean
  /** input de busca */
  search?: boolean
  /** menu de filtros aplicados */
  applied?: boolean
  /** menu de filtros */
  filters?: boolean
  /** filtro de data */
  calendar?: boolean
  /** filtro de intervalo de data */
  calendarInterval?: boolean
}

interface ToolbarProps {
  /** configuracoes dos filtros */
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
  /** configuracoes do filtro de busca */
  search?: {
    /** Recebe o valor inicial do componente */
    search?: string
    /** funcao que altera o valor do estado da string de busca */
    setSearch: React.Dispatch<React.SetStateAction<string>>
    /** callback executada quando a busca for enviada, pronta para requisicao no backend */
    onSubmit?: (value: string) => void | Promise<void>
  }
  /** funcao que sera chamada ao clicar no botao refresh */
  reloader?: () => void
  /** indicador de loading ativo */
  loading?: boolean
  /** configuracoes da paginacao */
  pagination?: {
    /** funcao para alterar a o estado do numero da pagina (offset pagination / legado) */
    setPage?: React.Dispatch<React.SetStateAction<number>>
    /** callback para resetar a paginação (cursor pagination) */
    reset?: () => void
    /** indicador de ultima pagina */
    isLastPage: boolean
    /** indicador de ultima pagina */
    paginator?: () => void
  }
  /** configuracoes do filtro de data */
  calendar?: {
    /** estado do filtro de data */
    date: string
    /** funcao que altera o estado do filtro de data */
    setDate: React.Dispatch<React.SetStateAction<string>>
  }
  /** configuracoes do filtro de intervalo de data */
  calendarInterval?: {
    /** estado do filtro de intervalo de data */
    dateInterval: [string, string]
    /** funcao que altera o estado do filtro de intervalo de data */
    setDateInterval: React.Dispatch<React.SetStateAction<[string, string]>>
  }
  /** conteudo diverso que sera exibido na parte esquerda da barra de ferramentas */
  children?: JSX.Element | JSX.Element[]
  /** conteudo diverso que sera exibido na parte antes dos filtros */
  before?: JSX.Element | JSX.Element[]
  /** conteudo diverso que sera exibido na parte depois dos filtros */
  after?: JSX.Element | JSX.Element[]
  /** os componentes especificados nesse objeto nao serao renderizados */
  except?: Except
  /** remove as bordas externas do toolbar */
  borderless?: boolean
}

const Toolbar = (props: ToolbarProps) => {
  const {
    filters,
    search,
    reloader,
    loading,
    pagination,
    calendar,
    calendarInterval,
    children,
    before,
    after,
    borderless,
  } = props

  const except: Except = props.except || {
    paginator: true,
    calendar: true,
    calendarInterval: true,
  }

  let elements: JSX.Element[] = []

  if (before) elements = elements.concat(before)

  let _resetPagination: () => void = () => {}

  if (pagination) {
    const { setPage, reset, isLastPage, paginator } = pagination
    _resetPagination = reset || (() => setPage?.(1))

    if (paginator && !except.paginator) {
      elements.push(
        <PageLoader
          loader={paginator}
          loading={loading}
          isLastPage={isLastPage}
        />,
      )
    }
  }

  if (reloader && !except.reloader) {
    elements.push(<Refresh reloader={reloader} loading={loading} />)
  }

  if (search && !except.search) {
    const { setSearch, search: _search, onSubmit } = search

    const _setSearch = (newState: string) => {
      setSearch(newState)
      _resetPagination()
    }

    elements.push(
      <Search
        search={_search}
        setSearch={_setSearch}
        onSubmit={onSubmit}
        disabled={loading}
        icon='feather'
        width='250px'
        transparent
        fluid
      />,
    )
  }

  if (filters) {
    const { appliedFilters, setAppliedFilters, bottomMargin } = filters

    const _setAppliedFilters: typeof setAppliedFilters = (newState) => {
      setAppliedFilters(newState)
      _resetPagination()
    }

    if (!except.applied) {
      elements.push(
        <Applied
          setAppliedFilters={_setAppliedFilters}
          appliedFilters={appliedFilters}
          loading={loading}
        />,
      )
    }

    if (!except.filters) {
      elements.push(
        <Menu
          appliedFilters={appliedFilters}
          setAppliedFilters={_setAppliedFilters}
          filters={filters.filters}
          loading={loading}
          bottomMargin={bottomMargin}
        />,
      )
    }
  }

  if (calendar && !except.calendar) {
    const { date, setDate } = { ...calendar }

    elements.push(
      <StyledDate>
        <Input
          type='datepicker'
          picker={{
            position: 'right bottom',
          }}
          value={date}
          setValue={setDate}
          disabled={loading}
          borderless
          paddingless
        />
      </StyledDate>,
    )
  }

  if (calendarInterval && !except.calendarInterval) {
    const { dateInterval, setDateInterval } = { ...calendarInterval }

    elements.push(
      <StyledInterval>
        <Input
          type='date-interval-picker'
          value={dateInterval}
          setValue={setDateInterval}
          disabled={loading}
          borderless
          paddingless
        />
      </StyledInterval>,
    )
  }

  if (after) elements = elements.concat(after)

  return <BlankToolbar left={children} right={elements} borderless={borderless} />
}

Toolbar.useDefaultDateIntervalState = Input.useDefaultDateIntervalState

export default Toolbar

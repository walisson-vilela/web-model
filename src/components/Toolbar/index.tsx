import React from 'react'

import Input from '../Input'
import BlankToolbar from '../MwManager/components/BlankToolbar'
import Applied from '../MwManager/components/Toolbar/Applied'
import Menu from '../MwManager/components/Toolbar/Menu'
import PageLoader from '../MwManager/components/Toolbar/PageLoader'
import Refresh from '../MwManager/components/Toolbar/Refresh'
import Search from '../MwManager/components/Toolbar/Search'
import type {
  AppliedFilter,
  Filter,
} from '../MwManager/components/Toolbar/interfaces'
import * as S from './styles'

interface Except {
  paginator?: boolean
  reloader?: boolean
  search?: boolean
  applied?: boolean
  filters?: boolean
  calendar?: boolean
  calendarInterval?: boolean
}

interface ToolbarProps {
  filters?: {
    filters: Filter[]
    appliedFilters: AppliedFilter[]
    setAppliedFilters: React.Dispatch<React.SetStateAction<AppliedFilter[]>>
    bottomMargin?: number
  }
  search?: {
    search?: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
  }
  reloader?: () => void
  loading?: boolean
  pagination?: {
    setPage?: React.Dispatch<React.SetStateAction<number>>
    reset?: () => void
    isLastPage: boolean
    paginator?: () => void
  }
  calendar?: {
    date: string
    setDate: React.Dispatch<React.SetStateAction<string>>
  }
  calendarInterval?: {
    dateInterval: [string, string]
    setDateInterval: React.Dispatch<
      React.SetStateAction<[string, string]>
    >
  }
  children?: React.ReactElement | React.ReactElement[]
  before?: React.ReactElement | React.ReactElement[]
  after?: React.ReactElement | React.ReactElement[]
  except?: Except
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
  } = props

  const except: Except = props.except || {
    paginator: true,
    calendar: true,
    calendarInterval: true,
  }

  const elements: React.ReactElement[] = []

  if (before) elements.push(...(Array.isArray(before) ? before : [before]))

  let resetPagination: () => void = () => {}

  if (pagination) {
    const { setPage, reset, isLastPage, paginator } = pagination
    resetPagination = reset || (() => setPage?.(1))

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
    const { setSearch, search: currentSearch } = search

    const setToolbarSearch = (newState: string) => {
      setSearch(newState)
      resetPagination()
    }

    elements.push(
      <Search
        search={currentSearch}
        setSearch={setToolbarSearch}
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

    const setToolbarAppliedFilters: typeof setAppliedFilters = (newState) => {
      setAppliedFilters(newState)
      resetPagination()
    }

    if (!except.applied) {
      elements.push(
        <Applied
          setAppliedFilters={setToolbarAppliedFilters}
          appliedFilters={appliedFilters}
          loading={loading}
        />,
      )
    }

    if (!except.filters) {
      elements.push(
        <Menu
          appliedFilters={appliedFilters}
          setAppliedFilters={setToolbarAppliedFilters}
          filters={filters.filters}
          loading={loading}
          bottomMargin={bottomMargin}
        />,
      )
    }
  }

  if (calendar && !except.calendar) {
    const { date, setDate } = calendar

    elements.push(
      <S.StyledDate>
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
      </S.StyledDate>,
    )
  }

  if (calendarInterval && !except.calendarInterval) {
    const { dateInterval, setDateInterval } = calendarInterval

    elements.push(
      <S.StyledInterval>
        <Input
          type='date-interval-picker'
          value={dateInterval}
          setValue={setDateInterval}
          disabled={loading}
          borderless
          paddingless
        />
      </S.StyledInterval>,
    )
  }

  if (after) elements.push(...(Array.isArray(after) ? after : [after]))

  return <BlankToolbar left={children} right={elements} />
}

Toolbar.useDefaultDateIntervalState = Input.useDefaultDateIntervalState

export default Toolbar

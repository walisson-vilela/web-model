import React, { useEffect, useState } from 'react'

import type { RouteTabProvider } from '../../../../../../routes/types'
import { CURRENT_MONTH, CURRENT_YEAR } from '../../constants'
import type { TabKey } from '../../tabs'

import type * as Types from './types'

const Context = React.createContext({} as Types.Context)

const useContext = () => React.useContext(Context)

export const Provider: RouteTabProvider = (props) => {
  const [tab, setTab] = useState<TabKey>('REGIONAL_HOLIDAY')
  const appliedFilters = useState<Types.Persist['appliedFilters']>({
    NATIONAL_HOLIDAY: [],
    REGIONAL_HOLIDAY: [],
    MEETING: [],
    COLLECTIVE_VACATION: [],
  })
  const search = useState<Types.Persist['search']>({
    NATIONAL_HOLIDAY: '',
    REGIONAL_HOLIDAY: '',
    MEETING: '',
    COLLECTIVE_VACATION: '',
  })
  const year = useState<Types.Persist['year']>({
    NATIONAL_HOLIDAY: CURRENT_YEAR,
    REGIONAL_HOLIDAY: CURRENT_YEAR,
    MEETING: CURRENT_YEAR,
    COLLECTIVE_VACATION: CURRENT_YEAR,
  })

  const [month, setMonth] = useState<number | null>(CURRENT_MONTH)

  const [loading, setLoading] = useState<boolean>(true)
  const [highlightDates, setHighlightDates] = useState<Types.HighlightDate[]>(
    [],
  )

  useEffect(() => {
    setMonth(year[0][tab] === CURRENT_YEAR ? CURRENT_MONTH : 0)
  }, [tab, appliedFilters[0], search[0], year[0]])

  const getSetState = React.useCallback(
    // eslint-disable-next-line comma-spacing
    <T,>(
      setState: React.Dispatch<React.SetStateAction<Types.TabState<T>>>,
    ): React.Dispatch<React.SetStateAction<T>> => {
      return (newstate) => {
        setState((prev) => {
          const result =
            typeof newstate === 'function'
              ? (newstate as (prev: T) => T)(prev[tab])
              : newstate

          if (result === prev[tab]) return prev

          return { ...prev, [tab]: result }
        })
      }
    },
    [tab],
  )

  return (
    <Context.Provider
      {...props}
      value={{
        tab: [tab, setTab],
        appliedFilters: [
          appliedFilters[0][tab],
          getSetState(appliedFilters[1]),
        ],
        search: [search[0][tab], getSetState(search[1])],
        year: [year[0][tab], getSetState(year[1])],
        month: [month, setMonth],
        loading: [loading, setLoading],
        highlightDates: [highlightDates, setHighlightDates],
      }}
    />
  )
}

export default useContext

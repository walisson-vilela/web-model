import { useCallback, useState } from 'react'

import { AppliedFilter } from '@mw-kit/mw-ui/types'

import { Event } from './interfaces'

const modes = ['future', 'history'] as const
type Mode = (typeof modes)[number]

export const useMode = () => {
  const [active, _setActive] = useState(0)
  const [params, setParams] = useState<{
    [K in Mode]: {
      search: string
      appliedFilters: AppliedFilter[]
    }
  }>({
    future: { search: '', appliedFilters: [] },
    history: { search: '', appliedFilters: [] },
  })
  const [pagination, setPagination] = useState({
    page: 1,
    count: 0,
    has_next_page: false,
  })
  const [events, setEvents] = useState<Event[]>([])

  const mode = modes[active]

  const setActive: typeof _setActive = useCallback(
    (s) => {
      const a = typeof s === 'function' ? s(active) : s
      if (modes[a] === undefined) throw Error('Invalid tab')
      _setActive(a)
      const mode = modes[a]
      setParams((prev) => ({
        ...prev,
        [mode]: { search: '', appliedFilters: [] },
      }))
      setPagination({
        page: 1,
        count: 0,
        has_next_page: false,
      })
      setEvents([])
    },
    [active],
  )

  const { search, appliedFilters } = params[mode]
  const setSearch: React.Dispatch<React.SetStateAction<string>> = useCallback(
    (s) => {
      setParams((prev) => {
        if (prev[mode] === undefined) return prev
        const search = typeof s === 'function' ? s(prev[mode].search) : s
        if (search === prev[mode].search) return prev
        return {
          ...prev,
          [mode]: {
            ...prev[mode],
            search,
          },
        }
      })

      setPagination({
        page: 1,
        count: 0,
        has_next_page: false,
      })
    },
    [mode],
  )

  const setAppliedFilters: React.Dispatch<
    React.SetStateAction<AppliedFilter[]>
  > = useCallback(
    (s) => {
      setParams((prev) => {
        if (prev[mode] === undefined) return prev
        const appliedFilters =
          typeof s === 'function' ? s(prev[mode].appliedFilters) : s
        if (appliedFilters === prev[mode].appliedFilters) return prev
        return {
          ...prev,
          [mode]: {
            ...prev[mode],
            appliedFilters,
          },
        }
      })

      setPagination({
        page: 1,
        count: 0,
        has_next_page: false,
      })
    },
    [mode],
  )

  return {
    active: [active, setActive],
    mode,
    search: [search, setSearch],
    appliedFilters: [appliedFilters, setAppliedFilters],
    pagination: [pagination, setPagination],
    events: [events, setEvents],
  } as const
}

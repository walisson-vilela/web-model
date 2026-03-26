import { useCallback, useEffect, useMemo, useState } from 'react'

import { useDebouncedState } from '../../../../hooks'
import { SEARCH_DEBOUNCE_MS } from '../../constants'
import type { SelectOptionsLoader } from '../../types'

type Pagination = {
  page: number
  last: boolean
  fetched: Date | null
}

const useAsyncOptions = <Option>(loader: SelectOptionsLoader<Option>) => {
  const [options, setOptions] = useState<Option[]>([])

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    last: false,
    fetched: null,
  })

  const cursor = useMemo(
    () => (options.length > 0 ? options[options.length - 1] : null),
    [options],
  )

  const {
    current: [searchInput, setSearchInput],
    debounced: [search],
  } = useDebouncedState(
    '',
    () => {
      setOptions([])

      setPagination({
        page: 1,
        last: true,
        fetched: null,
      })
    },
    SEARCH_DEBOUNCE_MS,
  )

  const loadOptions = useCallback(async () => {
    if (pagination.fetched !== null) return

    try {
      const result = await loader(search, pagination.page, cursor)

      // loader was aborted
      if (result === null) return

      setOptions(
        pagination.page === 1
          ? result.options
          : (prev) => [...prev, ...result.options],
      )
      setPagination((prev) => ({
        ...prev,
        fetched: new Date(),
        last: result.last,
      }))
    } catch (e) {
      setPagination((prev) => ({ ...prev, fetched: new Date(), last: true }))
    }
  }, [loader, search, pagination.page, pagination.fetched, cursor])

  const paginate = () =>
    setPagination((prev) =>
      prev.last
        ? prev
        : {
            page: prev.page + 1,
            last: true,
            fetched: null,
          },
    )

  useEffect(() => {
    loadOptions()
  }, [loadOptions])

  return {
    options,
    loading: pagination.fetched === null,
    paginate,
    searchInput: [searchInput, setSearchInput],
  } as const
}

export default useAsyncOptions

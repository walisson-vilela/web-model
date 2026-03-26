import { useEffect, useMemo, useRef } from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'

import type { CommonSelectProps } from '../../types'

type Params = {
  optionsLength: number
  loading: boolean
  onPaginate: () => void
} & Pick<CommonSelectProps<unknown>, 'overscan' | 'estimateSize'>

const useVirtualizedOptions = (params: Params) => {
  const { optionsLength, loading, onPaginate, overscan = 2 } = params

  const estimateSize = useMemo((): Exclude<
    CommonSelectProps<unknown>['estimateSize'],
    number | undefined
  > => {
    const estimateSize = params.estimateSize

    if (estimateSize === undefined) {
      return () => 46
    }

    if (typeof estimateSize === 'function') {
      return estimateSize
    }

    return () => estimateSize
  }, [params.estimateSize])

  const listRef = useRef<HTMLDivElement | null>(null)
  const searchRef = useRef<HTMLInputElement | null>(null)

  const rowVirtualizer = useVirtualizer({
    count: optionsLength,
    getScrollElement: () => listRef.current,
    estimateSize,
    overscan,
  })

  const virtualItems = rowVirtualizer.getVirtualItems()

  useEffect(() => {
    searchRef.current?.focus()
  }, [searchRef.current])

  const endIndex = useMemo(
    () => virtualItems[virtualItems.length - 1]?.index ?? 0,
    [virtualItems],
  )

  useEffect(() => {
    if (loading || optionsLength < 1) return

    if (endIndex >= optionsLength - 1 - overscan) {
      onPaginate()
    }
  }, [loading, endIndex, optionsLength, overscan, onPaginate])

  return {
    listRef,
    searchRef,
    rowVirtualizer,
    virtualItems,
  }
}

export default useVirtualizedOptions

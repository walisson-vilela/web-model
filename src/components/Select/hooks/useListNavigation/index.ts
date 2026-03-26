import type { KeyboardEvent } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'

type Params = {
  itemCount: number
  isItemDisabled: (index: number) => boolean
  onSelect: (index: number) => void
  scrollToIndex?: (index: number) => void
}

const INVALID_INDEX = -1

const useActiveIndex = (
  itemCount: Params['itemCount'],
  scrollToIndex: Params['scrollToIndex'],
) => {
  const [activeIndex, setActiveIndex] = useState(INVALID_INDEX)

  useEffect(() => {
    setActiveIndex((current) => {
      if (current >= itemCount) return INVALID_INDEX
      return current
    })
  }, [itemCount])

  const setActiveIndexMiddleware = (activeIndex: number, scroll = true) => {
    setActiveIndex(activeIndex)
    if (activeIndex < 0 || !scroll) return
    scrollToIndex?.(activeIndex)
  }

  return [activeIndex, setActiveIndexMiddleware] as const
}

const useListNavigation = ({
  itemCount,
  isItemDisabled,
  onSelect,
  scrollToIndex,
}: Params) => {
  const [activeIndex, setActiveIndex] = useActiveIndex(itemCount, scrollToIndex)

  const firstEnabledIndex = useMemo(() => {
    for (let index = 0; index < itemCount; index += 1) {
      if (!isItemDisabled(index)) return index
    }

    return INVALID_INDEX
  }, [isItemDisabled, itemCount])

  const lastEnabledIndex = useMemo(() => {
    for (let index = itemCount - 1; index >= 0; index -= 1) {
      if (!isItemDisabled(index)) return index
    }

    return INVALID_INDEX
  }, [isItemDisabled, itemCount])

  const findNextEnabled = useCallback(
    (from: number, direction: 1 | -1) => {
      let index = from

      while (index >= 0 && index < itemCount) {
        if (!isItemDisabled(index)) return index
        index += direction
      }

      return INVALID_INDEX
    },
    [isItemDisabled, itemCount],
  )

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        const from = activeIndex < 0 ? 0 : activeIndex + 1
        const next = findNextEnabled(from, 1)
        if (next >= 0) setActiveIndex(next)
        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        const from = activeIndex < 0 ? itemCount - 1 : activeIndex - 1
        const next = findNextEnabled(from, -1)
        if (next >= 0) setActiveIndex(next)
        return
      }

      if (event.key === 'Home') {
        event.preventDefault()
        if (firstEnabledIndex >= 0) setActiveIndex(firstEnabledIndex)
        return
      }

      if (event.key === 'End') {
        event.preventDefault()
        if (lastEnabledIndex >= 0) setActiveIndex(lastEnabledIndex)
        return
      }

      if ((event.key === 'Enter' || event.key === ' ') && activeIndex >= 0) {
        event.preventDefault()
        if (!isItemDisabled(activeIndex)) {
          onSelect(activeIndex)
        }
      }
    },
    [
      activeIndex,
      findNextEnabled,
      firstEnabledIndex,
      isItemDisabled,
      itemCount,
      lastEnabledIndex,
      onSelect,
    ],
  )

  const onMouseEnter = (index: number) => setActiveIndex(index, false)

  return {
    activeIndex,
    onMouseEnter,
    onKeyDown,
  }
}

export default useListNavigation

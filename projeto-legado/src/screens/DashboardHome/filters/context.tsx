import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  AREAS,
  FILTER_DEFAULT_STATE,
  FILTER_OPTIONS,
  FILTER_STORAGE_KEY,
  LEVEL_ELEMENTS,
  LEVELS,
} from './constants'
import type {
  DashboardFiltersContextValue,
  FilterKey,
  FilterState,
} from './types'

const DashboardFiltersContext = createContext<
  DashboardFiltersContextValue | undefined
>(undefined)

const parseStoredState = (): FilterState => {
  try {
    const stored = localStorage.getItem(FILTER_STORAGE_KEY)
    if (!stored) return FILTER_DEFAULT_STATE
    const parsed = JSON.parse(stored) as Partial<
      FilterState & {
        vision: number | string
        levelId: number | string
        levelElementId: number | string
        areasIds: (number | string)[]
        date: string
      }
    >
    const parseNumber = (
      value: number | string | undefined,
      fallback: number,
    ) => {
      if (value === undefined || value === null) return fallback
      const n = Number(value)
      return Number.isFinite(n) ? n : fallback
    }
    const normalizedAreas = Array.isArray(parsed.areasIds)
      ? parsed.areasIds
          .map((item) => Number(item))
          .filter(
            (value) =>
              Number.isFinite(value) && AREAS.some((area) => area.id === value),
          )
      : FILTER_DEFAULT_STATE.areasIds

    return {
      vision: parseNumber(parsed.vision, FILTER_DEFAULT_STATE.vision),
      levelId: parseNumber(parsed.levelId, FILTER_DEFAULT_STATE.levelId),
      levelElementId: parseNumber(
        parsed.levelElementId,
        FILTER_DEFAULT_STATE.levelElementId,
      ),
      areasIds: normalizedAreas,
      date:
        typeof parsed.date === 'string' && parsed.date
          ? parsed.date
          : FILTER_DEFAULT_STATE.date,
    }
  } catch {
    return FILTER_DEFAULT_STATE
  }
}

export const DashboardFiltersProvider = ({
  children,
}: PropsWithChildren) => {
  const [state, setState] = useState<FilterState>(() => parseStoredState())

  useEffect(() => {
    try {
      localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(state))
    } catch {
      // storage is optional; ignore errors silently
    }
  }, [state])

  const setFilter = useCallback((key: FilterKey, value: string | number) => {
    setState((prev) => {
      if (key === 'vision') {
        const n = typeof value === 'number' ? value : Number(value)
        if (!Number.isFinite(n) || prev.vision === n) return prev
        return { ...prev, vision: n }
      }
      return prev
    })
  }, [])

  const setLevelFilter = useCallback((levelId: number, levelElementId: number) => {
    setState((prev) => {
      if (
        prev.levelId === levelId &&
        prev.levelElementId === levelElementId
      ) {
        return prev
      }
      return { ...prev, levelId, levelElementId }
    })
  }, [])

  const setAreasFilter = useCallback((ids: number[]) => {
    setState((prev) => {
      const normalized = Array.from(
        new Set(
          ids
            .map((value) => Number(value))
            .filter(
              (value) =>
                Number.isFinite(value) &&
                AREAS.some((area) => area.id === value),
            ),
        ),
      )

      const prevString = prev.areasIds.join(',')
      const nextString = normalized.join(',')
      if (prevString === nextString) return prev
      return { ...prev, areasIds: normalized }
    })
  }, [])

  const setDateFilter = useCallback((date: string) => {
    setState((prev) => {
      if (prev.date === date) return prev
      return { ...prev, date }
    })
  }, [])

  const reset = useCallback(() => {
    setState(FILTER_DEFAULT_STATE)
  }, [])

  const value = useMemo<DashboardFiltersContextValue>(
    () => ({
      state,
      options: FILTER_OPTIONS,
      areas: AREAS,
      levels: LEVELS,
      levelElements: LEVEL_ELEMENTS,
      setFilter,
      setLevelFilter,
      setAreasFilter,
      setDateFilter,
      reset,
    }),
    [state, setFilter, setLevelFilter, setAreasFilter, setDateFilter, reset],
  )

  return (
    <DashboardFiltersContext.Provider value={value}>
      {children}
    </DashboardFiltersContext.Provider>
  )
}

export const useDashboardFilters = () => {
  const context = useContext(DashboardFiltersContext)
  if (!context) {
    throw new Error(
      'useDashboardFilters must be used within DashboardFiltersProvider',
    )
  }
  return context
}

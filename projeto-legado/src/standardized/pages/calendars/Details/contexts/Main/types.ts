import type { AppliedFilter } from '@mw-kit/mw-ui/types'

import type { TabKey } from '../../tabs'
import type { HighlightDate, ReactState, TabId } from '../../types'

export type Context = {
  tab: ReactState<TabKey>
  appliedFilters: ReactState<AppliedFilter[]>
  search: ReactState<string>
  year: ReactState<number>
  month: ReactState<number | null>
  loading: ReactState<boolean>
  highlightDates: ReactState<HighlightDate[]>
}

export type Persist = {
  tab: TabId
  appliedFilters: TabState<AppliedFilter[]>
  search: TabState<string>
  year: TabState<number>
}

export type TabState<StateType> = {
  [Id in TabId]: StateType
}

export type { ModalProps } from '../../components/types'
export type { HighlightDate, ReactState, TabId } from '../../types'

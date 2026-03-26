import type { AppliedFilter, Filter } from '@mw-kit/mw-ui/types'

import type { ReactState } from '../../types'

type Loader<Return> = (
  by_user: number,
  internal_access: number,
  config: {
    appliedFilters: AppliedFilter[]
    search: string
    page: number
  },
) => Promise<{
  data: Return[]
  has_next_page: boolean
  total_registries: number
}>

export type SelectorConfig<Type extends { id: number }> = {
  label: string
  rightLabel: string
  loader: Loader<Type>
  search: (search: string, data: Type) => boolean
  emptyMessage: string
  filters: (user_id: number) => Filter[]
  RowComponent: React.VoidFunctionComponent<{ data: Type }>
}

export type SelectorProps<Type extends { id: number }> =
  SelectorConfig<Type> & {
    selected: ReactState<Type[]>
    original: Type[]
  }

export type SelectorComponent = <Type extends { id: number }>(
  props: SelectorProps<Type>,
) => ReturnType<React.VoidFunctionComponent>

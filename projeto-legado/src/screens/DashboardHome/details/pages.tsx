import React from 'react'

import { createRouteTab } from '../../../routes'

import { DashboardFiltersProvider } from '../filters'

import type { ColumnInterface } from '@mw-kit/mw-manager'

import { CARD_DETAIL_CONFIGS } from './constants'
import DetailManagerPage from './DetailManagerPage'
import { getCard1Overrides } from './pagesVariants/card-1'

type DetailPageOverride = {
  columns?: ColumnInterface[]
  rows?: Array<Record<string, string | number | React.ReactNode>>
}

const DETAIL_PAGE_OVERRIDES: Record<string, DetailPageOverride> = {
  'card-1': getCard1Overrides(),
}

const createDetailPage = (id: string, description: string) =>
  createRouteTab(() => (
    <DashboardFiltersProvider>
      <DetailManagerPage
        description={description}
        columns={DETAIL_PAGE_OVERRIDES[id]?.columns}
        rowsSource={DETAIL_PAGE_OVERRIDES[id]?.rows}
      />
    </DashboardFiltersProvider>
  ))

const detailEntries = CARD_DETAIL_CONFIGS.map((detail) => [
  detail.id,
  createDetailPage(detail.id, detail.description),
]) as [string, ReturnType<typeof createDetailPage>][]

export const DASHBOARD_HOME_DETAIL_PAGES: Record<
  string,
  ReturnType<typeof createDetailPage>
> = Object.fromEntries(detailEntries)

import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  FiltersInterfaces,
  MwManager,
  SortState,
  Toolbar,
} from '@mw-kit/mw-manager'

import type { ColumnInterface } from '@mw-kit/mw-manager'
import { Header } from '../../../components/Header'
import MwManagerContainer from '../../../components/ManagerContainer'
import ManagerCounter from '../../../components/ManagerCounter'

const DEFAULT_COLUMNS: ColumnInterface[] = [
  { content: 'Indicador', key: 'metric', textAlign: 'left', width: 6 },
  { content: 'Valor', key: 'valueFormatted', textAlign: 'center', width: 3 },
  { content: 'Responsável', key: 'owner', textAlign: 'left', width: 7 },
]

const FILTERS: FiltersInterfaces.Filter[] = [
  {
    label: 'Canal',
    name: 'channel',
    options: [
      { label: 'Todos', value: 'all' },
      { label: 'Direto', value: 'direct' },
      { label: 'Indireto', value: 'indirect' },
    ],
  },
  {
    label: 'Tipo',
    name: 'type',
    options: [
      { label: 'Todos', value: 'all' },
      { label: 'Crítico', value: 'critical' },
      { label: 'Atenção', value: 'attention' },
      { label: 'OK', value: 'ok' },
    ],
  },
]

export type DetailManagerPageProps = {
  description: string
  columns?: ColumnInterface[]
  rowsSource?: Array<Record<string, ReactNode | string | number>>
}

type DetailRow = Record<string, ReactNode | string | number> & { id: string }

const DEFAULT_ROWS: Array<Record<string, ReactNode | string | number>> = [
  { metric: 'Equipe Norte', valueFormatted: '82,4%', owner: 'Norte' },
  { metric: 'Equipe Sul', valueFormatted: '73,8%', owner: 'Sul' },
  { metric: 'Equipe Sudeste', valueFormatted: '91,1%', owner: 'Sudeste' },
  { metric: 'Equipe Centro-Oeste', valueFormatted: '65,9%', owner: 'Centro-Oeste' },
  { metric: 'Equipe Nordeste', valueFormatted: '52,3%', owner: 'Nordeste' },
  { metric: 'Key Accounts', valueFormatted: '88,0%', owner: 'KA' },
  { metric: 'Proximidade', valueFormatted: '44,7%', owner: 'Proximidade' },
]

const DetailManagerPage: FC<DetailManagerPageProps> = ({ description, columns: overrideColumns, rowsSource }) => {
  const [rows, setRows] = useState<DetailRow[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [isLastPage, setIsLastPage] = useState(true)
  const [search, setSearch] = useState('')
  const [sortState, setSortState] = useState<SortState | null>(null)
  const [appliedFilters, setAppliedFilters] = useState<FiltersInterfaces.AppliedFilter[]>([])

  const columns = useMemo(() => overrideColumns ?? DEFAULT_COLUMNS, [overrideColumns])
  const sourceData = useMemo(() => rowsSource ?? DEFAULT_ROWS, [rowsSource])

  const buildRows = useCallback(() => {
    const text = search.trim().toLowerCase()
    const filtered = sourceData.filter((row) => {
      if (!text) return true
      return Object.values(row)
        .filter((value) => typeof value === 'string')
        .some((value) => (value as string).toLowerCase().includes(text))
    })

    const rowsPerPage = 10
    const start = (page - 1) * rowsPerPage
    const slice = filtered.slice(start, start + rowsPerPage)
    setTotal(filtered.length)
    setIsLastPage(start + rowsPerPage >= filtered.length)

    return slice.map((item, index) => ({
      id: `${page}-${index}`,
      ...item,
    }))
  }, [page, search, sourceData])

  const loadData = useCallback(() => {
    setLoading(true)
    const data = buildRows()
    setRows(data)
    setLoading(false)
  }, [buildRows])

  useEffect(() => {
    loadData()
  }, [loadData, appliedFilters, sortState])

  const reload = () => {
    setPage(1)
    loadData()
  }

  const paginator = () => {
    if (!isLastPage) {
      setPage((prev) => prev + 1)
    }
  }

  const hasFilters = appliedFilters.length > 0 || search.length > 0

  const toolbarDropdown: DropdownInterfaces.Item[] = [
    {
      content: 'Exportar',
      onClick: () => {
        console.log('Exportar')
      },
      rules: [],
    },
  ]

  return (
    <MwManagerContainer>
      <Header description={description} />

      <Toolbar
        filters={{ filters: FILTERS, appliedFilters, setAppliedFilters }}
        search={{ search, setSearch }}
        reloader={reload}
        loading={loading}
        pagination={{ setPage, isLastPage, paginator }}
      >
        <Dropdown
          items={toolbarDropdown}
          axis='y'
          centerCoodinates={{ y: 100 }}
          loading={loading}
        />
      </Toolbar>

      <MwManager
        columns={columns}
        rows={rows}
        hasFilters={hasFilters}
        loading={loading}
        sort={{ sort: sortState, setSort: setSortState }}
        paginator={paginator}
        page={page}
        setPage={setPage}
      />

      <ManagerCounter partial={rows.length} total={total} />
    </MwManagerContainer>
  )
}

export default DetailManagerPage

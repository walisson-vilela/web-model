import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../../../services/Axios'
import { download } from '../../../../../utils/DownloadFile'

type FormRow = {
  id: number
  name: string
  status_color: string
  accomplished_p1: number
  accomplished_p0: number
  reach: number
  default_fields: string[]
  default_fields_count: number
}

const MOCK_FORMS: FormRow[] = [
  {
    id: 1000000165,
    name: 'Pesquisa de Preço Forno de Minas...',
    status_color: 'green',
    accomplished_p1: 98.2,
    accomplished_p0: 98.2,
    reach: 100,
    default_fields: ['Preço', 'Ruptura', 'Frentes'],
    default_fields_count: 3,
  },
  {
    id: 1000000185,
    name: 'Auditoria de Ruptura FM',
    status_color: 'green',
    accomplished_p1: 52.2,
    accomplished_p0: 52.2,
    reach: 79.2,
    default_fields: ['Preço', 'Ruptura'],
    default_fields_count: 2,
  },
  {
    id: 1000000204,
    name: 'Campanha FM/MCCain',
    status_color: 'red',
    accomplished_p1: 100,
    accomplished_p0: 100,
    reach: 100,
    default_fields: [],
    default_fields_count: 0,
  },
]

const normalize = (s: unknown) => String(s ?? '').toLocaleLowerCase()

const matchesSearch = (row: FormRow, search: string) => {
  const q = normalize(search).trim()
  if (!q) return true
  return [row.id, row.name, row.accomplished_p0, row.reach].some((v) =>
    normalize(v).includes(q),
  )
}

const applyRange = (value: number, range: string) => {
  if (!range) return true
  if (range === '0 a 60') return value >= 0 && value <= 60
  if (range === '61 a 90') return value >= 61 && value <= 90
  if (range === '91 a 100') return value >= 91 && value <= 100
  return true
}

const getSortValue = (row: FormRow, sortKey: string): string | number => {
  switch (sortKey) {
    case 'id':
      return row.id
    case 'name':
      return row.name
    case 'accomplished_p1':
      return row.accomplished_p1
    case 'accomplished_p0':
      return row.accomplished_p0
    case 'reach':
      return row.reach
    case 'default_fields':
      return row.default_fields_count
    default:
      return ''
  }
}

const compare = (a: string | number, b: string | number) => {
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b), 'pt-BR')
}

const getFormsMock = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
) => {
  const pageSize = 10

  const accomplishedFilter = appliedFilters.find((f) => f.name === 'accomplished_p0')
  const accomplishedRange = accomplishedFilter ? String(accomplishedFilter.value) : ''

  const reachFilter = appliedFilters.find((f) => f.name === 'reach')
  const reachRange = reachFilter ? String(reachFilter.value) : ''

  let rows = MOCK_FORMS.filter((row) => matchesSearch(row, search))
  if (accomplishedRange)
    rows = rows.filter((row) => applyRange(row.accomplished_p0, accomplishedRange))
  if (reachRange) rows = rows.filter((row) => applyRange(row.reach, reachRange))

  if (sort?.sort) {
    rows = [...rows].sort((ra, rb) => {
      const r = compare(getSortValue(ra, sort.sort), getSortValue(rb, sort.sort))
      return sort.direction === 'desc' ? -r : r
    })
  }

  const start = (page - 1) * pageSize
  const slice = rows.slice(start, start + pageSize)

  return {
    pagination: {
      has_next_page: start + pageSize < rows.length,
      count: rows.length,
    },
    data: slice,
  }
}

// Essa função irá fazer a requisição ou extração dos dados.
export const getStores = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  extract: boolean = false,
): Promise<any> => {
  // Protótipo: se API estiver indisponível, retorna dados mockados como no print.
  // Mantém UI testável (tabela + tooltip + filtros) sem depender de backend.
  const params: any = { page }

  if (appliedFilters.length > 0)
    appliedFilters.map((e) => (params[e.name] = e.value))
  if (search) params.q = search
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  try {
    const { data } = await axios.get(
      `/v1/tr/markets/flags${extract ? '.xlsx' : ''}`,
      { params },
    )

    return data
  } catch (_error) {
    if (extract) {
      return { success: false, data: { url: '' } }
    }

    return getFormsMock(appliedFilters, search, sort, page)
  }
}

// Essa função irá fazer a requisição para extração dos dados
export const extractData = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
): Promise<any> => {
  const { success, data } = await getStores(
    appliedFilters,
    search,
    sort,
    page,
    true,
  )

  // Em mock/fallback, pode não haver URL.
  if (success && data?.url) download(data.url)
}

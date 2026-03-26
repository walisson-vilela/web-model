import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../../../services/Axios'
import { download } from '../../../../../utils/DownloadFile'

type OccupationRow = {
  id: number
  name: string
  status_color: string
  cities: string[]
  states: string[]
  sublocalities: string[]
  store_count: number
  executor_count: number
  accomplished_p1: number
  accomplished_p0: number
  reach: number
}

const MOCK_OCCUPATIONS: OccupationRow[] = [
  {
    id: 2500,
    name: 'Área 25',
    status_color: 'red',
    states: ['São Paulo'],
    cities: ['Contagem', 'Belo Horizonte', 'Betim', 'Sarzedo', 'Ibirité', 'Esmeraldas'],
    sublocalities: ['Quintas II'],
    store_count: 10,
    executor_count: 1,
    accomplished_p1: 98.2,
    accomplished_p0: 98.2,
    reach: 100,
  },
  {
    id: 2501,
    name: 'São Paulo - Capital',
    status_color: 'green',
    states: ['São Paulo'],
    cities: ['São Paulo'],
    sublocalities: ['Centro'],
    store_count: 100,
    executor_count: 1,
    accomplished_p1: 52.2,
    accomplished_p0: 52.2,
    reach: 79.2,
  },
  {
    id: 2502,
    name: 'Alpha 2',
    status_color: 'green',
    states: ['São Paulo'],
    cities: ['Barueri'],
    sublocalities: ['Alphaville'],
    store_count: 50,
    executor_count: 1,
    accomplished_p1: 100,
    accomplished_p0: 100,
    reach: 100,
  },
  {
    id: 2503,
    name: 'Rio Janeiro',
    status_color: 'green',
    states: ['Rio de Janeiro'],
    cities: ['Rio de Janeiro'],
    sublocalities: ['Copacabana'],
    store_count: 230,
    executor_count: 2,
    accomplished_p1: 100,
    accomplished_p0: 100,
    reach: 100,
  },
  {
    id: 2504,
    name: 'Área 1020',
    status_color: 'red',
    states: ['Minas Gerais'],
    cities: ['Belo Horizonte'],
    sublocalities: ['Savassi'],
    store_count: 105,
    executor_count: 5,
    accomplished_p1: 100,
    accomplished_p0: 100,
    reach: 100,
  },
  {
    id: 2505,
    name: 'Espirito Santos',
    status_color: 'red',
    states: ['Espírito Santo'],
    cities: ['Vitória'],
    sublocalities: ['Praia do Canto'],
    store_count: 10,
    executor_count: 10,
    accomplished_p1: 100,
    accomplished_p0: 100,
    reach: 100,
  },
  {
    id: 2506,
    name: 'Contagem',
    status_color: 'green',
    states: ['Minas Gerais'],
    cities: ['Contagem'],
    sublocalities: ['Eldorado'],
    store_count: 5,
    executor_count: 160,
    accomplished_p1: 100,
    accomplished_p0: 100,
    reach: 100,
  },
]

const normalize = (s: unknown) => String(s ?? '').toLocaleLowerCase()

const matchesSearch = (row: OccupationRow, search: string) => {
  const q = normalize(search).trim()
  if (!q) return true
  return [
    row.name,
    row.states.join(', '),
    row.cities.join(', '),
    row.sublocalities.join(', '),
  ].some((v) => normalize(v).includes(q))
}

const applyRange = (value: number, range: string) => {
  if (!range) return true
  if (range === '0 a 60') return value >= 0 && value <= 60
  if (range === '61 a 90') return value >= 61 && value <= 90
  if (range === '91 a 100') return value >= 91 && value <= 100
  return true
}

const getSortValue = (
  row: OccupationRow,
  sortKey: string,
): string | number => {
  switch (sortKey) {
    case 'name':
      return row.name
    case 'store_count':
      return row.store_count
    case 'executor_count':
      return row.executor_count
    case 'accomplished_p1':
      return row.accomplished_p1
    case 'accomplished_p0':
      return row.accomplished_p0
    case 'reach':
      return row.reach
    default:
      return ''
  }
}

const compare = (a: string | number, b: string | number) => {
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b), 'pt-BR')
}

const getOccupationsMock = async (
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

  let rows = MOCK_OCCUPATIONS.filter((row) => matchesSearch(row, search))
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

    return getOccupationsMock(appliedFilters, search, sort, page)
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

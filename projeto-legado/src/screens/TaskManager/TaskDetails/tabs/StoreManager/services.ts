import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../../../services/Axios'
import { download } from '../../../../../utils/DownloadFile'

type StoreRow = {
  id: number
  name: string
  chain_name: string
  route_name: string
  region_name: string
  executor_name: string
  role_name: string
  visit_count: string
  task_percent: number
  reason_not_concluded: string
}

const MOCK_STORES: StoreRow[] = [
  {
    id: 102000,
    name: 'Hipermercado Extra Contagem...',
    chain_name: 'Cash & Carry',
    route_name: 'Rota SP 1011',
    region_name: 'Minas Gerais...',
    executor_name: 'Carlos Soares da S...',
    role_name: 'Promotor',
    visit_count: '2/3',
    task_percent: 30,
    reason_not_concluded: 'Atestado Medicos...',
  },
  {
    id: 102001,
    name: 'Loja ATENTO BFI',
    chain_name: 'Farmacia',
    route_name: 'Rota MG 001',
    region_name: 'Belo Horizonte',
    executor_name: 'Marcos da Silva N.',
    role_name: 'Promotor',
    visit_count: '1/3',
    task_percent: 52.2,
    reason_not_concluded: '-',
  },
  {
    id: 102002,
    name: 'Extra Contagem',
    chain_name: 'Hipermercados',
    route_name: 'Rota MG 005',
    region_name: 'Grande BH',
    executor_name: 'Marcos da Silva N.',
    role_name: 'Promotor',
    visit_count: '1/1',
    task_percent: 100,
    reason_not_concluded: '-',
  },
  {
    id: 102003,
    name: 'Ponto Frio contagem...',
    chain_name: 'Hipermercados',
    route_name: 'Rota MG 15245',
    region_name: 'Interior de Minas',
    executor_name: 'Eudes Martins',
    role_name: 'Supervisor',
    visit_count: '3/3',
    task_percent: 80.2,
    reason_not_concluded: 'Visita a outra L...',
  },
  {
    id: 102004,
    name: 'Supermercado Bh C...',
    chain_name: 'Hipermercados',
    route_name: 'Rota MG 541',
    region_name: 'SP Capital',
    executor_name: 'Luiz Cadeia Louren...',
    role_name: 'Promotor',
    visit_count: '1/3',
    task_percent: 26.3,
    reason_not_concluded: 'Atestado Med...',
  },
  {
    id: 102005,
    name: 'Lojas Apoio Castelo',
    chain_name: 'Padaria',
    route_name: 'Rota 104562',
    region_name: 'Rio de Janeiro',
    executor_name: 'Luiz Cadeia Louren...',
    role_name: 'Promotor',
    visit_count: '0/3',
    task_percent: 0,
    reason_not_concluded: 'Atestado Med...',
  },
  {
    id: 102006,
    name: 'Assai Contagem',
    chain_name: 'Hipermercados',
    route_name: 'Rota MG 010',
    region_name: 'Curitiba',
    executor_name: 'Luiz Cadeia Louren...',
    role_name: 'Promotor',
    visit_count: '2/2',
    task_percent: 100,
    reason_not_concluded: '-',
  },
]

const normalize = (s: unknown) => String(s ?? '').toLocaleLowerCase()

const matchesSearch = (row: StoreRow, search: string) => {
  const q = normalize(search).trim()
  if (!q) return true
  return [
    row.name,
    row.chain_name,
    row.route_name,
    row.region_name,
    row.executor_name,
    row.role_name,
    row.visit_count,
    row.reason_not_concluded,
  ].some((v) => normalize(v).includes(q))
}

const applyPercentRange = (row: StoreRow, range: string) => {
  const value = row.task_percent
  if (range === '0 a 60') return value >= 0 && value <= 60
  if (range === '60 a 90') return value >= 60 && value <= 90
  if (range === '90 a 100') return value >= 90 && value <= 100
  return true
}

const getSortValue = (row: StoreRow, sortKey: string): string | number => {
  switch (sortKey) {
    case 'name':
      return row.name
    case 'chain':
      return row.chain_name
    case 'route':
      return row.route_name
    case 'region':
      return row.region_name
    case 'executor':
      return row.executor_name
    case 'role':
      return row.role_name
    case 'visit_count': {
      const [done] = row.visit_count.split('/')
      const n = Number(done)
      return Number.isFinite(n) ? n : row.visit_count
    }
    case 'task_percent':
      return row.task_percent
    case 'reason_not_concluded':
      return row.reason_not_concluded
    default:
      return ''
  }
}

const compare = (a: string | number, b: string | number) => {
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b), 'pt-BR')
}

const getStoresMock = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
) => {
  const pageSize = 10

  const percentFilter = appliedFilters.find((f) => f.name === 'active')
  const range = percentFilter ? String(percentFilter.value) : ''

  let rows = MOCK_STORES.filter((row) => matchesSearch(row, search))
  if (range) rows = rows.filter((row) => applyPercentRange(row, range))

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
  // Mantém UI testável (tabela + popups + filtros) sem depender de backend.
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

    return getStoresMock(appliedFilters, search, sort, page)
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

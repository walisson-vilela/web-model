import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../services/Axios'
import {
  WorkerEpiDistribution,
  WorkerEpiRow,
  WorkerExpirationEpiRow,
  WorkerExpirationFilter,
} from './interfaces'

type ListParams = {
  appliedFilters: FiltersInterfaces.AppliedFilter[]
  search: string
  sort: SortState | null
  page: number
}

type Pagination = {
  has_next_page?: boolean
  count?: number
}

type ListResponse = {
  data: WorkerEpiRow[]
  pagination: Pagination
}

type ApiManagementPerson = {
  epis_count?: string
  expired_in_0_days?: string
  expires_in_30_days?: string
  expires_in_60_days?: string
  expires_in_90_days?: string
  people?: {
    id?: number | null
    name?: string | null
  }
  user?: {
    id?: number | null
    active?: number | null
  }
}

type ApiManagementResponse = {
  success?: boolean
  data?: ApiManagementPerson[]
  pagination?: Pagination
}

const parseNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === 'number' && !Number.isNaN(value)) return value
  if (typeof value === 'string') {
    const numeric = Number(value)
    if (!Number.isNaN(numeric)) return numeric
  }
  return fallback
}

const parseString = (value: unknown, fallback = ''): string => {
  if (typeof value === 'string' && value.trim().length > 0) return value
  if (typeof value === 'number') return value.toString()
  return fallback
}

const buildStatus = (item: ApiManagementPerson): 'ok' | 'warning' | 'blocked' => {
  const expired = parseNumber(item.expired_in_0_days, 0)
  if (expired > 0) return 'warning'
  if (item.user?.active === 0) return 'blocked'
  return 'ok'
}

export const listWorkersEpiStatus = async (
  params: ListParams,
): Promise<ListResponse> => {
  const query: Record<string, unknown> = {
    page: params.page,
  }

  if (params.search) query.q = params.search
  if (params.sort) {
    query.sort = params.sort.sort
    query.direction = params.sort.direction
  }
  if (params.appliedFilters?.length) {
    params.appliedFilters.forEach((filter) => {
      if (filter.name) {
        query[filter.name] = filter.value
      }
    })
  }

  const { data: response } = await axios.get<ApiManagementResponse>(
    '/v1/epi-management/peoples',
    { params: query },
  )

  if (!response || response.success !== true) {
    throw new Error('Falha ao carregar colaboradores do EPI Management')
  }

  const rows = Array.isArray(response.data)
    ? response.data.reduce<WorkerEpiRow[]>((acc, item) => {
        const peopleId = parseNumber(item.people?.id, 0)
        const name = parseString(item.people?.name, '')
        if (!peopleId || !name) return acc

        const row: WorkerEpiRow = {
          id: peopleId,
          name,
          status: buildStatus(item),
          active: item.user?.active === 1,
          episReceived: parseNumber(item.epis_count, 0),
          expiring90: parseNumber(item.expires_in_90_days, 0),
          expiring60: parseNumber(item.expires_in_60_days, 0),
          expiring30: parseNumber(item.expires_in_30_days, 0),
          expired: parseNumber(item.expired_in_0_days, 0),
        }

        acc.push(row)
        return acc
      }, [])
    : []

  return {
    data: rows,
    pagination: {
      has_next_page: Boolean(response.pagination?.has_next_page),
      count: response.pagination?.count ?? rows.length,
    },
  }
}

const mockDistributions: WorkerEpiDistribution[] = [
  {
    id: 1,
    distributionCode: '102035',
    deliveredAt: '2025-01-10T08:10:21-03:00',
    deliveredBy: 'Jeremy Ramirez',
    items: [
      { id: 1, name: 'Jaleco P', quantity: 2 },
      { id: 2, name: 'Botas P', quantity: 2 },
      { id: 3, name: 'Luvas P', quantity: 3 },
      { id: 4, name: 'Uniformes P', quantity: 3 },
    ],
    totalDelivered: 10,
  },
  {
    id: 2,
    distributionCode: '102035',
    deliveredAt: '2024-01-10T08:10:21-03:00',
    deliveredBy: 'Jeremy Ramirez',
    items: [
      { id: 5, name: 'Jaleco P', quantity: 2 },
      { id: 6, name: 'Botas P', quantity: 2 },
      { id: 7, name: 'Luvas P', quantity: 3 },
      { id: 8, name: 'Uniformes P', quantity: 3 },
    ],
    totalDelivered: 10,
  },
]

export const listWorkerEpisReceived = async (
  _workerId: number,
): Promise<WorkerEpiDistribution[]> => {
  return Promise.resolve(mockDistributions)
}

const mockExpirationRows: WorkerExpirationEpiRow[] = [
  {
    id: '152035',
    type: 'Luva',
    quantity: 3,
    receivedAt: '2022-09-28T00:00:00-03:00',
    expiresAt: '2022-10-28T00:00:00-03:00',
    expiresInLabel: '90 dias',
  },
]

export const listWorkerEpisByExpiration = async (
  _workerId: number,
  _filter: WorkerExpirationFilter,
): Promise<WorkerExpirationEpiRow[]> => {
  return Promise.resolve(mockExpirationRows)
}

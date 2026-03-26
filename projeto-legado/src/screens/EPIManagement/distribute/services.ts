import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../services/Axios'
import {
  DistributionCardData,
  DistributionConferenceEpi,
  DistributionEpiType,
  DistributionSignature,
  DistributionSignatureEpi,
} from './interfaces'

type ListParams = {
  appliedFilters: FiltersInterfaces.AppliedFilter[]
  search: string
  sort: SortState | null
  dateInterval: [string, string]
  page: number
}

type Pagination = {
  has_next_page?: boolean
  count?: number
}

type ListResponse = {
  data: DistributionCardData[]
  pagination: Pagination
}

type ApiUser = {
  id?: number
  name?: string
  people_id_name?: string
}

type ApiDistribution = {
  id?: number
  editable?: boolean
  epi_count?: number
  epi_type_count?: number
  people_count?: number
  signed_count?: number
  expected_signed_count?: number
  created_at?: string
  created?: ApiUser
  owner?: ApiUser
}

type ApiPagination = {
  has_next_page?: boolean
  count?: number
}

type ApiResponse = {
  success?: boolean
  data?: ApiDistribution[]
  pagination?: ApiPagination
}

type ApiEpiType = {
  id?: number
  name?: string
  epi_count?: number
}

type ApiEpiTypeResponse = {
  success?: boolean
  data?: ApiEpiType[]
}

type ApiDistributionPerson = {
  id?: number
  name?: string
  profiles?: { id?: number; name?: string }[]
  supervisors?: { id?: number; name?: string }[]
  epis_count?: number
}

type ApiDistributionPeopleResponse = {
  success?: boolean
  data?: ApiDistributionPerson[]
}

type DistributionWorker = {
  id: string
  registry: string
  name: string
  profilesLabel: string
  supervisorsLabel: string
  epiCount: number
}

type ApiSignature = {
  id?: number
  type?: string
  status?: string
  people_id?: number
  people_name?: string
  registry_id?: string | number | null
  registry_mobile_date?: string | null
  epi_count?: number
  profiles?: { id?: number; name?: string }[]
  supervisors?: { id?: number; name?: string }[]
  registry_fingerprint?: string | null
  devices?: {
    id?: number
    device?: string
    manufacturer?: string
    model?: string
    version?: string
  }[]
}

type ApiSignaturesResponse = {
  success?: boolean
  data?: ApiSignature[]
}

type ApiSignatureEpi = {
  id?: number
  size?: string
  epi_type_id?: number
  epi_type_name?: string
  epi_count?: number
}

type ApiSignatureEpiResponse = {
  success?: boolean
  data?: ApiSignatureEpi[]
}

type ApiConferenceEpi = {
  id?: number
  name?: string
  epi_count?: number
  epis?: { id?: number; size?: string; total?: number }[]
}

type ApiConferenceResponse = {
  success?: boolean
  data?: ApiConferenceEpi[]
}

type ApiPerson = {
  id?: number
  name?: string
  re?: string | null
  people_id_name?: string
}

type ApiPeopleResponse = {
  success?: boolean
  data?: ApiPerson[]
  pagination?: ApiPagination
}

type ApiOwnerHistory = {
  id?: number
  people_id?: number
  people_name?: string
  start?: string
  end?: string | null
}

type ApiOwnersHistoryResponse = {
  success?: boolean
  data?: ApiOwnerHistory[]
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

const extractRegistry = (peopleIdName?: string, fallbackId?: number): string => {
  if (!peopleIdName) {
    return fallbackId ? fallbackId.toString() : ''
  }

  const [registry] = peopleIdName.split(' - ')
  return registry || (fallbackId ? fallbackId.toString() : '')
}

const buildStatus = (signed: number, expected: number) => {
  const completed = expected > 0 && signed >= expected
  return completed
    ? { label: 'Concluída', color: '#10B981' }
    : { label: 'Em andamento', color: '#6366F1' }
}

const mapDistribution = (item: ApiDistribution): DistributionCardData => {
  const id = parseNumber(item.id, 0)
  const totalItems = parseNumber(item.epi_count)
  const epiTypesCount = parseNumber(item.epi_type_count)
  const workersCount = parseNumber(item.people_count)
  const signedCount = parseNumber(item.signed_count)
  const expectedSigned = parseNumber(item.expected_signed_count)
  const pendingCount = Math.max(expectedSigned - signedCount, 0)

  const createdName = parseString(item.created?.name, '—')
  const createdRegistry = extractRegistry(
    item.created?.people_id_name,
    item.created?.id,
  )

  const ownerName = parseString(item.owner?.name, '—')
  const ownerRegistry = extractRegistry(
    item.owner?.people_id_name,
    item.owner?.id,
  )

  return {
    id,
    code: parseString(item.id, ''),
    epiName: '',
    workerName: '',
    workerRegistry: '',
    workerRole: '',
    workplace: '',
    deliveryDate: '',
    quantity: '',
    status: buildStatus(signedCount, expectedSigned),
    createdBy: {
      name: createdName,
      registry: createdRegistry,
      createdAt: parseString(item.created_at, ''),
    },
    distributedBy: {
      name: ownerName,
      registry: ownerRegistry,
    },
    totalItems,
    allowEditEpis: Boolean(item.editable),
    epiTypesCount,
    workersCount,
    signaturesSignedCount: signedCount,
    signaturesExpectedCount: expectedSigned,
    signatures: {
      done: signedCount,
      pending: pendingCount,
      signed: [],
      pendingList: [],
    },
    details: [],
    history: [],
    epiTypesSummary: undefined,
    conferenceList: [],
  }
}

export const listDistributions = async (
  params: ListParams,
): Promise<ListResponse> => {
  const query: Record<string, unknown> = {
    page: params.page,
    contain: 'Created,Owner',
  }

  if (params.search) query.q = params.search
  if (params.sort) {
    query.sort = params.sort.sort
    query.direction = params.sort.direction
  }
  const formatDate = (value?: string) =>
    value ? value.split(/[ T]/)[0] : undefined
  const periodStart = formatDate(params.dateInterval?.[0])
  const periodEnd = formatDate(params.dateInterval?.[1])
  if (periodStart) query.period_start = periodStart
  if (periodEnd) query.period_end = periodEnd
  if (params.appliedFilters?.length) {
    params.appliedFilters.forEach((filter) => {
      if (filter.name) {
        query[filter.name] = filter.value
      }
    })
  }

  const { data: response } = await axios.get<ApiResponse>(
    '/v1/epi-distributions',
    {
      params: query,
    },
  )

  if (!response || response.success !== true) {
    throw new Error('Falha ao carregar distribuições de EPI')
  }

  const list = Array.isArray(response.data)
    ? response.data.map(mapDistribution)
    : []

  return {
    data: list,
    pagination: {
      has_next_page: Boolean(response.pagination?.has_next_page),
      count: response.pagination?.count ?? list.length,
    },
  }
}

export const listDistributionEpiTypes = async (
  distributionId: number,
): Promise<DistributionEpiType[]> => {
  const { data: response } = await axios.get<ApiEpiTypeResponse>(
    `/v1/epi-distributions/${distributionId}/epi-types`,
  )

  if (!response || response.success !== true) {
    throw new Error('Falha ao carregar tipos de EPI da distribuição')
  }

  if (!Array.isArray(response.data)) return []

  return response.data.map((item) => ({
    id: parseNumber(item.id, 0),
    name: parseString(item.name, '—'),
    quantity: parseNumber(item.epi_count),
  }))
}

export const listDistributionWorkers = async (
  distributionId: number,
  params?: { profileId?: string | number },
): Promise<DistributionWorker[]> => {
  const { data: response } = await axios.get<ApiDistributionPeopleResponse>(
    `/v1/epi-distributions/${distributionId}/epi-distribution-peoples`,
    {
      params: params?.profileId
        ? {
            profile_id: params.profileId,
          }
        : undefined,
    },
  )

  if (!response || response.success !== true) {
    throw new Error('Falha ao carregar colaboradores da distribuição')
  }

  if (!Array.isArray(response.data)) return []

  return response.data.map((item) => {
    const id = parseNumber(item.id, 0)
    const registry = id ? id.toString() : ''

    const profilesLabel = Array.isArray(item.profiles)
      ? item.profiles
          .map((profile) => parseString(profile?.name, ''))
          .filter(Boolean)
          .join(', ')
      : ''

    const supervisorsLabel = Array.isArray(item.supervisors)
      ? item.supervisors
          .map((supervisor) => parseString(supervisor?.name, ''))
          .filter(Boolean)
          .join(', ')
      : ''

    return {
      id: registry || parseString(item.name, '') || id.toString(),
      registry: registry || '—',
      name: parseString(item.name, '—'),
      profilesLabel: profilesLabel || '—',
      supervisorsLabel: supervisorsLabel || '—',
      epiCount: parseNumber(item.epi_count),
    }
  })
}

export const listDistributionSignatures = async (
  distributionId: number,
  status: 'C' | 'P',
  params?: { profileId?: string | number },
): Promise<DistributionSignature[]> => {
  const { data: response } = await axios.get<ApiSignaturesResponse>(
    `/v1/epi-distributions/${distributionId}/signatures`,
    {
      params: {
        status,
        ...(params?.profileId ? { profile_id: params.profileId } : {}),
      },
    },
  )

  if (!response || response.success !== true) {
    throw new Error('Falha ao carregar assinaturas da distribuição')
  }

  if (!Array.isArray(response.data)) return []

  return response.data.map((item) => {
    const personId = parseNumber(item.people_id, 0)
    const registry = parseString(item.registry_id, '') || personId.toString()
    const profilesLabel = Array.isArray(item.profiles)
      ? item.profiles
          .map((profile) => parseString(profile?.name, ''))
          .filter(Boolean)
          .join(', ')
      : ''
    const supervisorsLabel = Array.isArray(item.supervisors)
      ? item.supervisors
          .map((supervisor) => parseString(supervisor?.name, ''))
          .filter(Boolean)
          .join(', ')
      : ''

    const device = (item.devices && item.devices[0]) || undefined
    const deviceLabel = device
      ? `${parseString(device.manufacturer, '')} ${parseString(
          device.model,
          '',
        )}`.trim()
      : undefined

    return {
      id: parseNumber(item.id, 0),
      signer: {
        name: parseString(item.people_name, '—'),
        registry: registry || '—',
        role: profilesLabel || '—',
        supervisor: supervisorsLabel || '—',
        workArea: '',
      },
      audit: {
        hash: parseString(item.registry_fingerprint, '—'),
        systemId: parseString(device?.device, '—'),
        device: deviceLabel,
        ip: '—',
        signedAt: parseString(item.registry_mobile_date, ''),
        faceBiometryValidated: false,
      },
      episDeliveredCount: parseNumber(item.epi_count, 0),
      epis: [],
      hasPartialDelivery: false,
      contractUrl: null,
      episBadge: false,
    }
  })
}

export const listSignatureEpis = async (
  distributionId: number,
  signatureId: number,
): Promise<DistributionSignatureEpi[]> => {
  const { data: response } = await axios.get<ApiSignatureEpiResponse>(
    `/v1/epi-distributions/${distributionId}/signatures/${signatureId}/epi-delivered`,
  )

  if (!response || response.success !== true) {
    throw new Error('Falha ao carregar EPIs entregues da assinatura')
  }

  if (!Array.isArray(response.data)) return []

  return response.data.map((item) => ({
    id: parseNumber(item.id, 0),
    label: parseString(item.epi_type_name, '—'),
    size: parseString(item.size, ''),
    quantity: parseNumber(item.epi_count, 0),
  }))
}

export const listDistributionConference = async (
  distributionId: number,
): Promise<DistributionConferenceEpi[]> => {
  const { data: response } = await axios.get<ApiConferenceResponse>(
    `/v1/epi-distributions/${distributionId}/list-epis`,
  )

  if (!response || response.success !== true) {
    throw new Error('Falha ao carregar lista de conferência de EPI\'s')
  }

  if (!Array.isArray(response.data)) return []

  return response.data.map((item) => ({
    id: parseNumber(item.id, 0),
    name: parseString(item.name, '—'),
    sizes:
      Array.isArray(item.epis)
        ? item.epis.map((epi, index) => ({
            id: epi?.id ?? index,
            label: parseString(epi?.size, '—'),
            quantity: parseNumber(epi?.total, 0),
          }))
        : [],
  }))
}

type DistributionOwnerCandidate = {
  id: number
  name: string
  registry: string
}

type DistributionOwnerHistory = {
  id: number
  name: string
  startAt: string
  endAt?: string | null
}

export const removeDistributionWorkers = async (
  distributionId: number,
  peopleIds: number[],
): Promise<void> => {
  const { data: response } = await axios.post(
    `/v1/epi-distributions/${distributionId}/delete-distribution-peoples`,
    {
      people_ids: peopleIds,
    },
  )

  if (!response || response.success !== true) {
    throw new Error('Falha ao remover colaboradores')
  }
}

const formatOwnerLabel = (person: ApiPerson): string => {
  const name = parseString(person.name, '—')
  const registry = parseString(person.re, '')
  return registry ? `${registry} - ${name}` : name
}

export const listDistributionOwners = async (): Promise<DistributionOwnerCandidate[]> => {
  const { data: response } = await axios.get<ApiPeopleResponse>(
    '/v1/peoples',
    { params: { 'no-paginate': 1 } },
  )

  if (!response || response.success !== true) {
    throw new Error('Falha ao carregar lista de distribuidores')
  }

  if (!Array.isArray(response.data)) return []

  return response.data
    .map((person) => ({
      id: parseNumber(person.id, 0),
      name: formatOwnerLabel(person),
      registry: parseString(person.re, ''),
    }))
    .filter((item) => item.id > 0)
}

export const listOwnersHistory = async (
  distributionId: number,
): Promise<DistributionOwnerHistory[]> => {
  const { data: response } = await axios.get<ApiOwnersHistoryResponse>(
    `/v1/epi-distributions/${distributionId}/owners-history`,
  )

  if (!response || response.success !== true) {
    throw new Error('Falha ao carregar histórico de distribuidores')
  }

  if (!Array.isArray(response.data)) return []

  return response.data.map((item) => ({
    id: parseNumber(item.id, 0),
    name: parseString(item.people_name, '—'),
    startAt: parseString(item.start, ''),
    endAt: parseString(item.end || '', '') || null,
  }))
}

export const updateDistributionOwner = async (
  distributionId: number,
  ownerId: number,
): Promise<void> => {
  const { data: response } = await axios.post(
    `/v1/epi-distributions/${distributionId}/edit-owner`,
    {
      owner_id: ownerId,
    },
  )

  if (!response || response.success !== true) {
    throw new Error('Falha ao atualizar distribuidor')
  }
}

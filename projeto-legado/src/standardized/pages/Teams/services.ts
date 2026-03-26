import type { AppliedFilter } from '@mw-kit/mw-ui/types'

import axios from '../../../services/Axios/instance'
import { download } from '../../../utils/DownloadFile'
import { booleanOrDefault, numberOrDefault } from '../../../utils/Formatters'
import { isBoolean } from '../../../utils/Validators'
import { notEmptyStringOrDefault } from '../../utils/formatters'
import { isObject } from '../../utils/validators'

import type { NodeType, SuperiorType } from './types'

export const parseUser = (el: unknown) => {
  if (
    !isObject(el) ||
    !isObject(el.user) ||
    !isObject(el.user.role) ||
    !isObject(el.user.person)
  ) {
    return null
  }

  const resp: Exclude<NodeType['hierarchies_user'], null> = {
    manual: booleanOrDefault(el.manual, false),
    manual_label: notEmptyStringOrDefault(el.manual_label),
    region_count: numberOrDefault(el.region_count, 0),
    mirroring_count: numberOrDefault(el.mirroring_count, 0),
    approval_count: numberOrDefault(el.approval_count),

    user: {
      id: numberOrDefault(el.user.id, 0),
      name: notEmptyStringOrDefault(el.user.name),
      role: {
        id: numberOrDefault(el.user.role.id, 0),
        name: notEmptyStringOrDefault(el.user.role.name),
      },
      person: {
        id: numberOrDefault(el.user.person.id, 0),
        registration: notEmptyStringOrDefault(el.user.person.registration),
      },
      avatar: isObject(el.user.avatar)
        ? {
            url: notEmptyStringOrDefault(el.user.avatar.url),
            name: notEmptyStringOrDefault(el.user.avatar.name),
          }
        : null,
    },
  }
  return resp
}

const parseNode = (item: unknown[]) => {
  return item.reduce<NodeType[]>((prev, el) => {
    if (!isObject(el) || !isObject(el.structure)) return prev

    const resp: NodeType = {
      id: numberOrDefault(el.id, null),
      parent_id: numberOrDefault(el.parent_id, null),
      name: notEmptyStringOrDefault(el.name),
      region_count: numberOrDefault(el.region_count, 0),
      team_count: numberOrDefault(el.team_count, 0),
      child_count: numberOrDefault(el.child_count, 0),
      hierarchies_user: parseUser(el.hierarchies_user),
      structure: {
        id: numberOrDefault(el.structure.id, 0),
        level: numberOrDefault(el.structure.level, 0),
        level_label: notEmptyStringOrDefault(el.structure.level_label, ''),
        name: notEmptyStringOrDefault(el.structure.name),
      },
      children: parseNode(Array.isArray(el.children) ? el.children : []),
      superior_name: notEmptyStringOrDefault(el.superior_name),
    }

    prev.push(resp)
    return prev
  }, [])
}

const parseSuperiorNode = (item: unknown[]) => {
  return item.reduce<SuperiorType[]>((prev, el) => {
    if (!isObject(el)) return prev
    const resp: SuperiorType = {
      region_count: numberOrDefault(el.region_count, 0),
      user: {
        id: numberOrDefault(el.user.id, 0),
        name: notEmptyStringOrDefault(el.user.name, 'Indefinido'),
        role: {
          id: numberOrDefault(el.user.role.id, 0),
          name: notEmptyStringOrDefault(el.user.role.name, 'Indefinido'),
        },
        person: {
          id: numberOrDefault(el.user.person.id, 0),
          registration: notEmptyStringOrDefault(
            el.user.person.registration,
            'Indefinido',
          ),
        },
        enrollment: {
          name: notEmptyStringOrDefault(el.user.enrollment.name, 'Indefinido'),
        },
      },
    }

    prev.push(resp)
    return prev
  }, [])
}

export const deleteHierarchiesApprovals = async (
  hierarchy_id: number,
  params: { hierarchy_element_id: number } | { user_ids: number[] },
): Promise<void> => {
  await axios.post(
    `v1/tr/hierarchies/${hierarchy_id}/approvals/delete-ids`,
    params,
  )
}

type FetchNodesParams = {
  hierarchy_id: number
  parent_id?: number
  search?: string
  page?: number
  suffix?: string
  by_user?: boolean
  appliedFilters?: AppliedFilter[]
}

const fetchNodes = async (params: FetchNodesParams) => {
  return await axios.get(
    `v1/tr/hierarchies/${params.hierarchy_id}/elements${params.suffix || ''}`,
    {
      params: {
        ...(params.by_user ? { by_user: '' } : {}),
        ...(params.parent_id ? { parent_id: params.parent_id } : {}),
        ...(params.search ? { q: params.search } : {}),
        ...(params.page ? { page: params.page } : {}),
        ...(params.appliedFilters || []).reduce((params, { name, value }) => {
          return { ...params, [name]: value }
        }, []),
      },
    },
  )
}

export const getNodes = async (
  params: Omit<FetchNodesParams, 'suffix' | 'parent_id'>,
): Promise<{
  nodes: NodeType[]
  last_level: number
}> => {
  const { data: response } = await fetchNodes(params)

  if (!isObject(response) || !Array.isArray(response.data)) {
    throw new Error('Invalid Response')
  }

  const last_level = numberOrDefault(response.last_level, null)
  if (last_level === null) {
    throw new Error('Invalid last_level')
  }

  return { nodes: parseNode(response.data), last_level: last_level }
}

export const getNodesByParentId = async (
  params: Omit<FetchNodesParams, 'suffix'>,
): Promise<{
  data: NodeType[]
  pagination: { count: number; has_next_page: boolean; page: number }
}> => {
  const { data: response } = await fetchNodes(params)

  if (!isObject(response) || !Array.isArray(response.data)) {
    throw new Error('Invalid Response')
  }

  return {
    data: parseNode(response.data),
    pagination: {
      has_next_page: false,
      page: 1,
      count: 0,
      ...(isObject(response.pagination)
        ? {
            has_next_page: booleanOrDefault(
              response.pagination.has_next_page,
              false,
            ),
            count: numberOrDefault(response.pagination.count, 0),
            page: numberOrDefault(response.pagination.current_page, 1),
          }
        : {}),
    },
  }
}

export const getNodesXlsx = async (
  params: Omit<FetchNodesParams, 'page'>,
): Promise<void> => {
  const { data: response } = await fetchNodes({ ...params, suffix: '.xlsx' })

  if (!isObject(response) || !isObject(response.data)) {
    throw new Error('Invalid Response')
  }

  const url = notEmptyStringOrDefault(response.data.url)

  if (!url) {
    throw new Error('Empty url')
  }

  download(url)
}

export const saveHierarchySuperior = async (
  hierarchy_id: number,
  userIds: number[],
  superiorId: number,
): Promise<void> => {
  const payload = {
    ids: userIds,
    superior_id: superiorId,
  }

  await axios.post(`v1/tr/hierarchies/${hierarchy_id}/superiors`, payload)
}

export const checkTeamName = async (
  hierarchy_id: number,
  notchId: number,
  name: string,
): Promise<boolean> => {
  const params = {
    id: notchId,
    name: name,
  }
  const response = await axios.get(
    `v1/tr/hierarchies/${hierarchy_id}/elements/check-name`,
    { params: params },
  )

  if (response.status !== 200) {
    throw new Error('Error checking team name')
  }
  const { data } = response

  if (
    isObject(data) &&
    data != null &&
    'success' in data &&
    isBoolean(data.success)
  ) {
    return data.success
  }

  return false
}

export const editTeamName = async (
  hierarchy_id: number,
  notchId: number,
  name: string,
): Promise<void> => {
  const params = {
    name: name,
  }

  const response = await axios.put(
    `v1/tr/hierarchies/${hierarchy_id}/elements/${notchId}`,
    params,
  )

  if (response.status !== 200) {
    throw new Error('Error updating team name')
  }
}

export const DeleteUserFromMirroring = async (
  hierarchy_id: number,
  user_id: number,
  mirror_id: number,
): Promise<void> => {
  const response = await axios.delete(
    `v1/tr/hierarchies/${hierarchy_id}/mirrorings/${user_id}/${mirror_id}`,
  )

  if (response.status !== 200) {
    throw new Error('Error deleting user')
  }
}

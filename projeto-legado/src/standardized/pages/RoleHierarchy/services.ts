import axios from '../../../services/Axios'
import {
  booleanOrDefault,
  dateOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import { Modifier } from '../../components/form/components/Footer'
import { notEmptyStringOrDefault } from '../../utils/formatters'
import { isObject } from '../../utils/validators'

import {
  parserHierarchy,
  parserLevels,
  parserRole,
  parserSchedule,
} from './parser'
import { Hierarchy, Level, Role, Schedule } from './types'

export const getHierarchies = async (): Promise<Hierarchy[]> => {
  const params = {
    by_person: '',
  }
  const { data } = await axios.get('/v1/tr/hierarchies/options', { params })

  if (!data.success || !Array.isArray(data.data)) {
    throw new Error('Invalid Request')
  }
  return parserHierarchy(data.data)
}

export const getRoles = async (
  search: string,
  hierarchy_id: number,
  page: number,
  except: number[],
): Promise<{
  data: Role[]
  pagination: {
    has_next_page: boolean
    count: number
    page: number
  }
}> => {
  const params = {
    ...(search ? { q: search } : {}),
    hierarchy_id,
    internal_access: 0,
    status: 'A',
    page,
    ...(except.length > 0 ? { except: except.join(',') } : {}),
  }

  const { data } = await axios.get('v1/tr/roles/options', { params })

  if (!data.success || !Array.isArray(data.data)) {
    throw new Error('Invalid Request')
  }

  return {
    data: parserRole(data.data),
    pagination: {
      has_next_page: false,
      page: 1,
      count: 0,
      ...(isObject(data.pagination)
        ? {
            has_next_page: booleanOrDefault(
              data.pagination.has_next_page,
              false,
            ),
            count: numberOrDefault(data.pagination.count, 0),
            page: numberOrDefault(data.pagination.current_page, 1),
          }
        : {}),
    },
  }
}
export const getLevelsAndSchedule = async (
  id: number,
): Promise<{
  data: {
    levels: Level[]
    schedule: Schedule | null
    lastModify: Modifier
  }
  pagination: {
    has_next_page: boolean
    count: number
    page: number
  }
}> => {
  const { data } = await axios.get(`/v1/tr/hierarchies/${id}/structures`)

  if (!data.success || !Array.isArray(data.data.structure)) {
    throw new Error('Invalid Request')
  }

  return {
    data: {
      levels: parserLevels(data.data.structure),
      schedule: parserSchedule(data.data.schedule, id),
      lastModify: {
        at: dateOrDefault(data.data.processed_at, null, 'YYYY-MM-DD HH:mm:ss'),
        ...(isObject(data.data.modifier)
          ? {
              id: numberOrDefault(data.data.modifier.id),
              name: notEmptyStringOrDefault(data.data.modifier.name),
            }
          : {
              name: null,
            }),
      },
    },
    pagination: {
      has_next_page: false,
      page: 1,
      count: 0,
      ...(isObject(data.pagination)
        ? {
            has_next_page: booleanOrDefault(
              data.pagination.has_next_page,
              false,
            ),
            count: numberOrDefault(data.pagination.count, 0),
            page: numberOrDefault(data.pagination.current_page, 1),
          }
        : {}),
    },
  }
}

export const deleteSchedule = async (id: number): Promise<void> => {
  await axios.delete(`v1/tr/hierarchies/${id}/structures`)
}

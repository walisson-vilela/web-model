import axios from '../../../../../../../../../../../../services/Axios'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../../../../../utils/Validators'
import {
  type PaginationObjType,
  parsePaginationObj,
} from '../../../../../../../../../../../services/parsers/pagination'

import type { CopyEvent } from './types'

const parser = (data: unknown[]): CopyEvent[] => {
  return data.reduce<CopyEvent[]>((data, e) => {
    if (!isObject(e)) return data

    const id = numberOrDefault(e.id)
    if (!id) return data

    const parsed: CopyEvent = {
      id,
      name: notEmptyStringOrDefault(e.name, ''),
    }
    data.push(parsed)
    return data
  }, [])
}

export const getUserCopyEvents = async (
  is_parent: boolean | string,
  type: string,
  ignore?: number,
  search?: string,
  page?: number,
): Promise<{
  data: CopyEvent[]
  paginationData: PaginationObjType
}> => {
  try {
    const { data: response } = await axios.get('v1/tr/user-events/options', {
      params: {
        is_parent,
        type,
        ...(page ? { page } : {}),
        ...(ignore ? { ignore } : {}),
        ...(search ? { q: search } : {}),
      },
    })
    if (!isObject(response)) {
      throw new Error('Request returned an invalid data!')
    }
    if (!response.success) throw new Error('Request returned no success!')

    return {
      data: parser(response.data),
      paginationData: parsePaginationObj(
        response.pagination,
        response.data.length || 0,
      ),
    }
  } catch (e) {
    console.error(e)
    throw new Error('Request returned an invalid data!')
  }
}

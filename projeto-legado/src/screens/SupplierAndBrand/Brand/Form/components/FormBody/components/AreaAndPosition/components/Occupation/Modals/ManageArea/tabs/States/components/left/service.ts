import axios from '../../../../../../../../../../../../../../../../services/Axios/instance'
import { notEmptyStringOrDefault } from '../../../../../../../../../../../../../../../../standardized/utils/formatters'
import { isObject } from '../../../../../../../../../../../../../../../../standardized/utils/validators'
import {
  booleanOrDefault,
  numberOrDefault,
} from '../../../../../../../../../../../../../../../../utils/Formatters'
import { State } from '../../../../interface'

export const getOptions = async (
  search: string,
  page: number,
): Promise<{ data: State[]; pagination: { has_next_page: boolean } }> => {
  const params = {
    page,
    ...(search ? { q: search } : {}),
  }

  const { data: res } = await axios.get(`/v1/region-states`, { params })

  if (!isObject(res)) {
    throw new Error('Invalid response')
  }

  if (!res.success || !Array.isArray(res.data)) {
    throw new Error('Invalid value response')
  }

  const parsed = res.data.reduce((parsed, e) => {
    if (!isObject(e)) return parsed

    const foreign_id = numberOrDefault(e.id)

    if (!foreign_id) return parsed

    const data: State = {
      foreign_id,
      name: notEmptyStringOrDefault(e.name),
      name_short: notEmptyStringOrDefault(e.name_short),
    }
    return [...parsed, data]
  }, [] as State[])

  return {
    data: parsed,
    pagination: {
      has_next_page: false,
      ...(isObject(res.pagination)
        ? {
            has_next_page: booleanOrDefault(
              res.pagination.has_next_page,
              false,
            ),
          }
        : {}),
    },
  }
}

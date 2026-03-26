import axios from '../../../../../../../../../services/Axios/instance'
import { notEmptyStringOrDefault } from '../../../../../../../../../standardized/utils/formatters'
import { isObject } from '../../../../../../../../../standardized/utils/validators'
import {
  booleanOrDefault,
  numberOrDefault,
} from '../../../../../../../../../utils/Formatters'
import { Segments } from '../../../../interface'

export const getOptions = async (
  search: string,
  page: number,
): Promise<{ data: Segments[]; pagination: { has_next_page: boolean } }> => {
  const params = {
    page,
    ...(search ? { q: search } : {}),
  }

  const { data: res } = await axios.get(`/v1/tr/segments/options`, { params })

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

    const data: Segments = {
      foreign_id,
      name: notEmptyStringOrDefault(e.name),
    }
    return [...parsed, data]
  }, [] as Segments[])

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

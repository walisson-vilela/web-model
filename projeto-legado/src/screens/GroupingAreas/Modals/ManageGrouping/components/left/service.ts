import axios from '../../../../../../services/Axios/instance'
import { notEmptyStringOrDefault } from '../../../../../../standardized/utils/formatters'
import { isObject } from '../../../../../../standardized/utils/validators'
import { numberOrDefault } from '../../../../../../utils/Formatters'
import { Selected } from '../../interface'

export const getOptions = async (
  search: string,
  hierarchy_id: number,
): Promise<Selected> => {
  const params = {
    limit: 200,
    ...(search ? { q: search } : {}),
    hierarchy_id,
  }

  const { data: res } = await axios.get(`/v1/tr/regions`, { params })

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

    const data: Selected[number] = {
      foreign_id,
      name: notEmptyStringOrDefault(e.name),
    }
    return [...parsed, data]
  }, [] as Selected)

  return parsed
}

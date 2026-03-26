import axios from '../../../../../../services/Axios/instance'
import { notEmptyStringOrDefault } from '../../../../../../standardized/utils/formatters'
import { isObject } from '../../../../../../standardized/utils/validators'
import { numberOrDefault } from '../../../../../../utils/Formatters'
import { Selected } from '../../interface'

const getAreas = async (id: string): Promise<Selected> => {
  const params = {
    contain: 'Regions',
  }

  const { data: res } = await axios.get(`/v1/tr/grouping-areas/${id}`, {
    params,
  })

  if (!isObject(res)) {
    throw new Error('Invalid response')
  }

  if (!res.success || !isObject(res.data) || !Array.isArray(res.data.regions)) {
    throw new Error('Invalid value response')
  }

  const parsed = res.data.regions.reduce<Selected>((parsed, e) => {
    if (!isObject(e)) return parsed

    const foreign_id = numberOrDefault(e.id)
    if (!foreign_id) return parsed

    const item: Selected[number] = {
      foreign_id,
      name: notEmptyStringOrDefault(e.name),
    }

    return [...parsed, item]
  }, [])

  return parsed
}

export default getAreas

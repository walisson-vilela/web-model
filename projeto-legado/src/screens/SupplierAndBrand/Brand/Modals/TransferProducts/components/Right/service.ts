import axios from '../../../../../../../services/Axios/instance'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'
import { Brand } from '../../interfaces'

const parseRegions = (data: unknown[], current: number): Brand[] => {
  return data.reduce<Brand[]>((parsed, e): Brand[] => {
    if (!isObject(e)) return parsed

    const id = numberOrDefault(e.id)
    if (!id || id === current) return parsed

    const item: Brand = {
      id,
      name: notEmptyStringOrDefault(e.name),
    }

    return [...parsed, item]
  }, [])
}

export const getBrands = async (
  search: string,
  page: number,
  id: number,
  type: string,
): Promise<{ data: Brand[]; pagination: { has_next_page: boolean } }> => {
  const params = {
    active: 1,
    type,
    page,
    ...(search
      ? {
          q: search,
        }
      : {}),
  }

  const { data: response } = await axios.get('/v1/tr/brands/options', {
    params,
  })

  if (!isObject(response) || !Array.isArray(response.data)) {
    throw new Error('Invalid response')
  }

  if (!response.success) throw new Error('Response failed')

  return {
    data: parseRegions(response.data, id),
    pagination: {
      has_next_page: false,
      ...(isObject(response.pagination)
        ? {
            has_next_page: booleanOrDefault(
              response.pagination.has_next_page,
              false,
            ),
          }
        : {}),
    },
  }
}

import axios from '../../../../../../../services/Axios/instance'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'
import { Region } from '../../interfaces'

const parseRegions = (data: unknown[], current: number): Region[] => {
  return data.reduce<Region[]>((parsed, e): Region[] => {
    if (!isObject(e)) return parsed

    const id = numberOrDefault(e.id)
    if (!id || id === current) return parsed

    const item: Region = {
      id,
      name: notEmptyStringOrDefault(e.name),
    }

    return [...parsed, item]
  }, [])
}

export const getRegions = async (
  search: string,
  id: number,
  hierarchy_id: number,
): Promise<Region[]> => {
  const params = {
    limit: 9999,
    active: 1,
    hierarchy_id,
    ...(search
      ? {
          q: search,
        }
      : {}),
  }

  const {
    data: { data },
  } = await axios.get('/v1/tr/regions/options', { params })

  return parseRegions(data, id)
}

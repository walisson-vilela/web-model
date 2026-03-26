import axios from '../../../../../../../services/Axios/instance'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'
import { Typology } from '../../interfaces'

const parseTypologies = (data: unknown[], checkId: number): Typology[] => {
  return data.reduce<Typology[]>((typology, nextTypology): Typology[] => {
    if (!isObject(nextTypology)) return typology

    const id = numberOrDefault(nextTypology.id)
    if (!id || id === checkId) return typology
    const checkTypology: Typology = {
      id,
      default_id: numberOrDefault(nextTypology.default_id),
      name: notEmptyStringOrDefault(nextTypology.name),
    }

    return [...typology, checkTypology]
  }, [])
}

export const getTypologies = async (
  search: string,
  id: number,
): Promise<Typology[]> => {
  const params = {
    limit: 9999,
    active: 1,

    ...(search
      ? {
          q: search,
        }
      : {}),
  }

  const {
    data: { data },
  } = await axios.get('/v1/tr/typologies', { params })

  return parseTypologies(data, id)
}

import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../services/Axios/instance'
import { cepFormatter } from '../../../../../../../standardized/utils/formatters'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'
import { PDV } from '../../interfaces'

const parsePDVS = (data: unknown[]): PDV[] => {
  return data.reduce<PDV[]>((pdvUnknown, nextPdvUnknown): PDV[] => {
    if (!isObject(nextPdvUnknown)) return pdvUnknown

    const id = numberOrDefault(nextPdvUnknown.id)
    if (!id) return pdvUnknown

    const checkUnknownPdv: PDV = {
      id,
      formatted_address: `${nextPdvUnknown.address.formatted} - ${cepFormatter(
        nextPdvUnknown.address.postal_code,
      )}`,
      name: notEmptyStringOrDefault(nextPdvUnknown.nickname),
    }
    return [...pdvUnknown, checkUnknownPdv]
  }, [])
}

export const getPDVs = async (
  search: string,
  id: number,
  default_id: number | null,
  filters: GenericObject,
): Promise<PDV[]> => {
  const params: GenericObject = {
    limit: 9999,
    ...(default_id ? { typology_default_id: default_id } : { typology_id: id }),
    ...filters,
    ...(search
      ? {
          q: search,
          q_options: 'Stores.name,Stores.formatted_address',
        }
      : {}),
  }

  const {
    data: { data },
  } = await axios.get('/v1/tr/stores', { params })

  return parsePDVS(data)
}

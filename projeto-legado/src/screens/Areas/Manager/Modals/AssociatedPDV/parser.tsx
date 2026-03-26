import { cepFormatter } from '../../../../../standardized/utils/formatters'
import { isObject } from '../../../../../standardized/utils/validators'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'

import { BodyInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: unknown[]): BodyInterface[] => {
  return data.reduce<BodyInterface[]>((parsed, aux) => {
    if (!isObject(aux) || !isObject(aux.stores_contractor)) return parsed

    const id = numberOrDefault(aux.id)
    if (!id) return parsed

    const item: BodyInterface = {
      id,
      nickname: notEmptyStringOrDefault(aux.stores_contractor.nickname),
      address: null,
      segment_id: null,
      segment_name: null,
      typology_id: null,
      typology_name: null,
      covered: booleanOrDefault(aux.stores_contractor.covered),
      covered_label: notEmptyStringOrDefault(
        aux.stores_contractor.covered_label,
      ),
    }

    if (isObject(aux.address)) {
      const address = [
        notEmptyStringOrDefault(aux.address.formatted, ''),
        cepFormatter(notEmptyStringOrDefault(aux.address.postal_code, '')),
      ].join(' - ')

      if (address) item.address = address
    }

    if (isObject(aux.stores_contractor.segment)) {
      item.segment_id = numberOrDefault(aux.stores_contractor.segment.id)
      item.segment_name = notEmptyStringOrDefault(
        aux.stores_contractor.segment.name,
      )
    }

    if (isObject(aux.stores_contractor.typology)) {
      item.typology_id = numberOrDefault(aux.stores_contractor.typology.id)
      item.typology_name = notEmptyStringOrDefault(
        aux.stores_contractor.typology.name,
      )
    }

    return [...parsed, item]
  }, [])
}

export default parser

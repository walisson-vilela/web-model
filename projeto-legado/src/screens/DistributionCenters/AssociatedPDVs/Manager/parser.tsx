import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'

import { BodyInterface, DataInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    const item: BodyInterface = {
      id: null,
      name: null,
      formatted_address: null,
      typology_name: null,
      segment_name: null,
    }

    if (!isObject(e.store)) return item

    item.id = numberOrDefault(e.store.id)
    item.name = notEmptyStringOrDefault(e.store.name)
    item.formatted_address = notEmptyStringOrDefault(e.store.formatted_address)
    item.typology_name = isObject(e.store.typology)
      ? notEmptyStringOrDefault(e.store.typology.name)
      : null
    item.segment_name = isObject(e.store.segment)
      ? notEmptyStringOrDefault(e.store.segment.name)
      : null

    return item
  })
}

export default parser

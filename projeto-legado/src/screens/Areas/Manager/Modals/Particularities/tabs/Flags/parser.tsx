import { isObject } from '../../../../../../../standardized/utils/validators'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'

import { BodyInterface } from './types'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: unknown[]): BodyInterface[] => {
  return data.reduce<BodyInterface[]>((parsed, aux) => {
    if (!isObject(aux)) return parsed

    const id = numberOrDefault(aux.id)
    if (!id) return parsed

    const item: BodyInterface = {
      id,
      name: notEmptyStringOrDefault(aux.name, ''),
      region_rule_label: notEmptyStringOrDefault(aux.region_rule_label, ''),
      network_name: null,
      group_name: null,
    }

    if (isObject(aux.network)) {
      item.network_name = notEmptyStringOrDefault(aux.network.name)

      if (isObject(aux.network.group)) {
        item.group_name = notEmptyStringOrDefault(aux.network.group.name)
      }
    }

    return [...parsed, item]
  }, [])
}

export default parser

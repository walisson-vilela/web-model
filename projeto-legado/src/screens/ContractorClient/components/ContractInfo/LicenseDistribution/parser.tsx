import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { isObject } from '../../../../../utils/Validators'

import { BodyInterface, DataInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    return {
      id:
        isObject(e.contractor_license) &&
        isObject(e.contractor_license.contractor) &&
        numberOrDefault(e.contractor_license.contractor.account_id),
      nickname:
        isObject(e.contractor_license) &&
        isObject(e.contractor_license.contractor) &&
        notEmptyStringOrDefault(e.contractor_license.contractor.nickname),
      hierarchies:
        isObject(e.hierarchy) && notEmptyStringOrDefault(e.hierarchy.name),
      reserved: numberOrDefault(e.reserved),
      consumed: numberOrDefault(e.consumed),
      consumed_percent: numberOrDefault(e.consumed_percent.toFixed(2)) + '%',
    }
  })
}

export default parser

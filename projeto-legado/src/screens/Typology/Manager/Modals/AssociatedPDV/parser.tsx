import { isObject } from 'lodash'

import { cepFormatter } from '../../../../../standardized/utils/formatters'

import { BodyInterface, DataInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    return {
      id: e.hasOwnProperty('id') ? e.id : null,
      pdv: e.hasOwnProperty('nickname') ? e.nickname : null,
      address: e.hasOwnProperty('address')
        ? `${e.address.formatted} - ${cepFormatter(e.address.postal_code)}`
        : null,
      segment_id:
        isObject(e.stores_contractor?.segment) &&
        e.stores_contractor.segment?.id
          ? e.stores_contractor.segment?.id
          : null,
      segment:
        isObject(e.stores_contractor?.segment) &&
        e.stores_contractor.segment?.name
          ? e.stores_contractor.segment?.name
          : null,
    }
  })
}

export default parser

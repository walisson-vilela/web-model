import { cepFormatter } from '../../../../../standardized/utils/formatters'

import { BodyInterface, DataInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    return {
      id: e.hasOwnProperty('id') ? e.id : null,
      pdv: e.stores_contractor.hasOwnProperty('nickname')
        ? e.stores_contractor.nickname
        : null,
      address: e.address.hasOwnProperty('formatted')
        ? `${e.address.formatted} - ${cepFormatter(e.address.postal_code)}`
        : null,
      segment:
        e.stores_contractor.segment &&
        e.stores_contractor.segment.hasOwnProperty('name')
          ? e.stores_contractor.segment.name
          : null,
      typology:
        e.stores_contractor.typology &&
        e.stores_contractor.typology.hasOwnProperty('name')
          ? e.stores_contractor.typology.name
          : null,
    }
  })
}

export default parser

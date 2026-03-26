import { GenericObject } from '@mw-kit/mw-ui/types'

import {
  ClientLicenses,
  ContractInfoInterface,
} from '../../../../../../../screens/ContractorClient/interfaces'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'

const clientLicensesTratament = (
  client_licenses: GenericObject[],
): ClientLicenses[] => {
  return client_licenses.reduce<ClientLicenses[]>(
    (client_licenses, client_license) => {
      if (!isObject(client_license)) return client_licenses

      const id = numberOrDefault(client_license.type)
      if (!id) return client_licenses

      return [
        ...client_licenses,
        {
          id,
          client_id: numberOrDefault(client_license.client_id),
          type: numberOrDefault(client_license.type),
          total: numberOrDefault(client_license.total),
          reserved: client_license.reserved,
          available: numberOrDefault(client_license.available),
          consumed: numberOrDefault(client_license.consumed),
          consumed_percent: numberOrDefault(client_license.consumed_percent),
          type_text: notEmptyStringOrDefault(client_license.type_text),
        },
      ]
    },
    [],
  )
}

const parseContractInfo = (data: GenericObject): ContractInfoInterface => {
  const parse: ContractInfoInterface = {
    id: numberOrDefault(data.id),
    total_licences: numberOrDefault(data.total_licences),
    minimum_licenses: numberOrDefault(data.minimum_licenses),
    licenses_in_use: numberOrDefault(data.licenses_in_use),
    client_licenses: clientLicensesTratament(data.client_licenses),
  }
  return parse
}

export default parseContractInfo

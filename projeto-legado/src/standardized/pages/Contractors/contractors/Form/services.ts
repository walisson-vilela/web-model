import { GenericObject } from '@mw-kit/mw-ui/types'

import { ContractInfoInterface } from '../../../../../screens/ContractorClient/interfaces'
import axios from '../../../../../services/Axios'
import {
  booleanOrDefault,
  capitalize,
  notEmptyStringOrDefault,
  numberOrDefault,
  trimAll,
} from '../../../../../utils/Formatters'
import { isObject, isOneOf } from '../../../../../utils/Validators'
import {
  IAddress,
  ICoordinates,
} from '../../../../components/form/sections/Address/interfaces'
import { ADDRESS_TYPE_MAP } from '../../../../constants/addressType'
import BRAZILIAN_STATES from '../../../../constants/uf'
import { cepFormatter } from '../../../../utils/formatters'

import { parseContractInfo, parseLicenses } from './parsers'
import { Data, Licenses } from './types'

export {
  createContractor,
  getContractor,
  getContractorByName,
  getContractorPeoples,
  updateContractor,
} from '../../services'

type ContractorByDocument = Omit<IAddress, keyof ICoordinates> & {
  name: string
} & Pick<Required<ICoordinates>, 'lat' | 'lng' | 'radius'>

type ContractorDocumentReturn =
  | { success: true; data: ContractorByDocument }
  | { success: false; data: Pick<ContractorByDocument, 'name'> }

const casts: {
  [Field in keyof ContractorByDocument]: (
    response: GenericObject,
  ) => ContractorByDocument[Field]
} = {
  name: (response) => {
    let name = ((response) => {
      const value = notEmptyStringOrDefault(response.nickname, '')
      return value
    })(response)
    name = trimAll(name)
    name = capitalize(name)

    return name
  },
  street_type: (response) => {
    let street_type = notEmptyStringOrDefault(response.address.street_type, '')
    street_type = trimAll(street_type)
    street_type = capitalize(street_type)

    return isOneOf(street_type, Object.values(ADDRESS_TYPE_MAP))
      ? street_type
      : ''
  },

  street_number: (response) => {
    const street_number = numberOrDefault(response.address.street_number)

    return street_number ? street_number.toString() : ''
  },

  street_address: (response) => {
    let street_address = notEmptyStringOrDefault(
      response.address.street_name,
      '',
    )
    street_address = trimAll(street_address)
    street_address = capitalize(street_address)

    return street_address
  },

  complement: (response) => {
    let complement = notEmptyStringOrDefault(response.address.complement, '')
    complement = trimAll(complement)
    complement = complement.slice(0, 80)

    return complement
  },
  sublocality: (response) => {
    let sublocality = notEmptyStringOrDefault(
      response.address.sublocality_name,
      '',
    )
    sublocality = trimAll(sublocality)
    sublocality = capitalize(sublocality)
    sublocality = sublocality.slice(0, 80)

    return sublocality
  },
  postal_code: (response) => {
    let postal_code = notEmptyStringOrDefault(response.address.postal_code, '')

    postal_code = cepFormatter(postal_code)

    return postal_code
  },
  state: (response) => {
    let state = notEmptyStringOrDefault(response.address.state_code, '')

    state = trimAll(state)
    return isOneOf(state, Object.values(BRAZILIAN_STATES.acronym)) ? state : ''
  },
  city: (response) => {
    let city = notEmptyStringOrDefault(response.address.city_name, '')
    city = trimAll(city)
    city = capitalize(city)
    city = city.slice(0, 80)

    return city
  },
  lat: (response) => {
    const lat = numberOrDefault(response.coordinate.lat, null)

    return lat
  },

  lng: (response) => {
    const lng = numberOrDefault(response.coordinate.lng, null)

    return lng
  },
  radius: (response) => {
    const radius = numberOrDefault(response.coordinate.radius, 50)

    return radius
  },
}

export const getContractorByDocument = async (
  document: string,
  data: Data,
): Promise<ContractorDocumentReturn> => {
  const params: GenericObject = {
    document,
  }
  if (data.id) params.id = data.id

  const { data: response } = await axios.post(
    '/v1/tr/contractors/check-document',
    params,
  )
  const success = booleanOrDefault(response.success, false)
  if (!success) {
    if (!isObject(response.data)) throw new Error('invalid response')
    return { success: false, data: { name: casts.name(response.data) } }
  }

  if (!isObject(response.data)) {
    const values: ContractorByDocument = {
      postal_code: cepFormatter(notEmptyStringOrDefault(data.postal_code, '')),
      city: notEmptyStringOrDefault(data.locality, ''),
      lat: numberOrDefault(data.lat, null),
      lng: numberOrDefault(data.lng, null),
      name: notEmptyStringOrDefault(data.name, ''),
      radius: numberOrDefault(data.radius, 50),
      state: notEmptyStringOrDefault(data.state_short, ''),
      street_address: notEmptyStringOrDefault(data.street, ''),
      street_number: notEmptyStringOrDefault(
        numberOrDefault(data.street_number),
        '',
      ),
      street_type: notEmptyStringOrDefault(data.street_type, ''),

      sublocality: notEmptyStringOrDefault(data.district, ''),
      complement: notEmptyStringOrDefault(data.complement, ''),
    }
    return {
      success: booleanOrDefault(response.success, false),
      data: values,
    }
  }

  const localData = isObject(response.data) ? response.data : {}
  localData.address = isObject(response.data.address)
    ? response.data.address
    : {}
  localData.coordinate = isObject(response.data.coordinate)
    ? response.data.coordinate
    : {}
  const values = Object.entries(casts).reduce((values, [field, parser]) => {
    const value = parser(localData)
    return { ...values, [field]: value }
  }, {} as ContractorByDocument)

  return {
    success: true,
    data: values,
  }
}

export const getContractorBySubdomain = async (
  subdomain: string,
): Promise<GenericObject> => {
  const params: GenericObject = {
    subdomain,
  }

  const { data } = await axios.post('/v1/accounts/validate-subdomain', params)

  return data
}

export const getLicensesAndContractInfo = async (): Promise<{
  licenses: Licenses
  contractInfo: ContractInfoInterface
}> => {
  const { data } = await axios.get('/v1/tr/clients/view')

  if (!data.success) throw new Error('Request returned no success!')
  if (!isObject(data.data) || !Array.isArray(data.data.client_licenses)) {
    throw new Error('Request returned an invalid data!')
  }

  const licenses = parseLicenses(data.data.client_licenses)
  const contractInfo = parseContractInfo(data.data)

  return { licenses, contractInfo }
}

import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../services/Axios/instance'
import {
  booleanOrDefault,
  cep,
  cnpj,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import Address from '../../../../../../components/form/sections/Address'
import { cepFormatter } from '../../../../../../utils/formatters'
import { isObject } from '../../../../../../utils/validators'
import { sourceStatusOrDefault } from '../../../../functions'
import { Form, IFormStores } from '../../interfaces'

type ResponseUsed = {
  success: false
  nickname: string
}

type ResponseValid = {
  success: true
}

type ResponseRF = {
  success: true
  data: Pick<
    Form,
    | 'fantasy_name'
    | 'company_name'
    | 'situation_name'
    | 'source_status'
    | 'nickname'
    | 'postal_code'
    | 'street_type'
    | 'street_address'
    | 'street_number'
    | 'complement'
    | 'sublocality'
    | 'city'
    | 'state'
    | 'address_lat'
    | 'address_lng'
    | 'lat'
    | 'lng'
    | 'radius'
    | 'geolocation_tolerance'
    | 'geolocation_status'
  >
}

type ResponseBaseStoreData = {
  document: string
  nickname: string
  source_status: Form['source_status']
  address: string
}

export type ResponseBaseStoreDataId = ResponseBaseStoreData & { id: number }
type ResponseBaseStoreDataAbras = ResponseBaseStoreData & {
  source: 'ABRAS'
}

export type ResponseBaseStore = {
  success: true
  data: ResponseBaseStoreDataId | ResponseBaseStoreDataAbras
}

export type ResponseBaseStoreYourself = {
  success: boolean
  data: {
    id: number
  } & Pick<
    Form,
    | 'fantasy_name'
    | 'company_name'
    | 'situation_name'
    | 'source_status'
    | 'source_address'
  >
}

type CheckDocumentResponse =
  | ResponseUsed
  | ResponseValid
  | ResponseRF
  | ResponseBaseStore
  | ResponseBaseStoreYourself

const checkDocument = async (
  document: string,
  mode: IFormStores['mode'],
  id?: number | null,
): Promise<CheckDocumentResponse> => {
  const params = {
    document,
    ...(id ? { id } : {}),
    ...(mode === 'base-stores' ? { mode: 'store' } : {}),
  }

  const { data: response }: GenericObject = await axios.post(
    'v1/tr/stores/check-document',
    params,
  )

  if (!isObject(response)) throw new Error('Invalid response')

  const success = booleanOrDefault(response.success)
  if (success === null) throw new Error('Missing success')

  if (success === false) {
    if (!isObject(response.data)) {
      throw new Error('Invalid response data')
    }

    return {
      success,
      nickname: notEmptyStringOrDefault(
        isObject(response.data.stores_contractor)
          ? response.data.stores_contractor.nickname
          : response.data.nickname,
        '',
      ),
    }
  }

  if (!isObject(response.data)) {
    return {
      success,
    }
  }

  const store_id = numberOrDefault(response.data.id)

  if (store_id) {
    const source_status = sourceStatusOrDefault(
      response.data.source_status,
      null,
    )

    if (store_id === id) {
      const source_address = response.data.source_address

      if (!isObject(source_address)) {
        throw new Error('Missing source_address')
      }

      const parsed: ResponseBaseStoreYourself = {
        success,
        data: {
          id: store_id,
          fantasy_name: notEmptyStringOrDefault(response.data.fantasy_name, ''),
          company_name: notEmptyStringOrDefault(response.data.company_name, ''),
          situation_name: notEmptyStringOrDefault(
            response.data.situation_name,
            '',
          ),

          source_status,

          source_address: {
            formatted: notEmptyStringOrDefault(source_address.formatted, ''),
            lat: numberOrDefault(source_address.lat, 0),
            lng: numberOrDefault(source_address.lng, 0),
            postal_code: cepFormatter(
              notEmptyStringOrDefault(source_address.postal_code, ''),
            ),
            street_type: notEmptyStringOrDefault(
              source_address.street_type,
              '',
            ),
            street_address: notEmptyStringOrDefault(
              source_address.street_name,
              '',
            ),
            street_number: notEmptyStringOrDefault(
              source_address.street_number,
              '',
            ),
            complement: notEmptyStringOrDefault(source_address.complement, ''),
            sublocality: notEmptyStringOrDefault(
              source_address.sublocality_name,
              '',
            ),
            city: notEmptyStringOrDefault(source_address.city_name, ''),
            state: notEmptyStringOrDefault(source_address.state_code, ''),
          },
        },
      }

      return parsed
    }

    if (!isObject(response.data.address)) throw new Error('Missing address')

    const parsed: ResponseBaseStore = {
      success,
      data: {
        id: store_id,

        document: cnpj(notEmptyStringOrDefault(response.data.document, '')),
        nickname: notEmptyStringOrDefault(response.data.nickname, ''),
        source_status,
        address: notEmptyStringOrDefault(response.data.address.formatted, ''),
      },
    }

    return parsed
  }

  const source = notEmptyStringOrDefault(response.data.source)
  if (source === 'ABRAS') {
    const source_status = sourceStatusOrDefault(
      response.data.source_status,
      null,
    )

    const parsed: ResponseBaseStore = {
      success,
      data: {
        document: cnpj(notEmptyStringOrDefault(response.data.document, '')),
        nickname: notEmptyStringOrDefault(response.data.nickname, ''),
        source_status,
        address: notEmptyStringOrDefault(response.data.address.formatted, ''),
        source,
      },
    }

    return parsed
  }

  const parsed: ResponseRF = {
    success,
    data: {
      nickname: notEmptyStringOrDefault(response.data.nickname, ''),
      source_status: 'VALID',
      fantasy_name: notEmptyStringOrDefault(response.data.fantasy_name, ''),
      company_name: notEmptyStringOrDefault(response.data.company_name, ''),
      situation_name: notEmptyStringOrDefault(response.data.situation_name, ''),
      postal_code: cep(
        notEmptyStringOrDefault(response.data.address.postal_code, ''),
      ),
      street_type: notEmptyStringOrDefault(
        response.data.address.street_type,
        '',
      ),
      street_address: notEmptyStringOrDefault(
        response.data.address.street_name,
        '',
      ),
      street_number: notEmptyStringOrDefault(
        response.data.address.street_number,
        '',
      ),
      complement: notEmptyStringOrDefault(response.data.address.complement, ''),
      sublocality: notEmptyStringOrDefault(
        response.data.address.sublocality_name,
        '',
      ),
      city: notEmptyStringOrDefault(response.data.address.city_name, ''),
      state: notEmptyStringOrDefault(response.data.address.state_code, ''),
      address_lat: numberOrDefault(response.data.address.lat, 0),
      address_lng: numberOrDefault(response.data.address.lng, 0),
      lat: numberOrDefault(response.data.coordinate.lat, 0),
      lng: numberOrDefault(response.data.coordinate.lng, 0),
      radius: numberOrDefault(
        response.data.coordinate.radius,
        Address.constants.DEFAULT_RADIUS,
      ),
      geolocation_tolerance: numberOrDefault(
        response.data.coordinate.tolerance,
        Address.constants.DEFAULT_TOLERANCE,
      ),
      geolocation_status: null,
    },
  }

  return parsed
}

export default checkDocument

import { GenericObject } from '@mw-kit/mw-ui/types'

import { numberOrDefault } from '../../../../../utils/Formatters'
import addressType from '../../../../constants/addressType'
import BRAZILIAN_STATES from '../../../../constants/uf'
import {
  cepFormatter,
  notEmptyStringOrDefault,
} from '../../../../utils/formatters'

import { DEFAULT_RADIUS, DEFAULT_TOLERANCE } from './constants'
import { IAddress } from './interfaces'

export const requestParser = (data: GenericObject): IAddress => {
  const lat = numberOrDefault(data.lat, null)
  const lng = numberOrDefault(data.lng, null)

  return {
    postal_code: cepFormatter(notEmptyStringOrDefault(data.postal_code, '')),
    street_type: addressType.includes(data.street_type) ? data.street_type : '',
    street_address: notEmptyStringOrDefault(data.street_address, ''),
    street_number: notEmptyStringOrDefault(data.street_number, ''),
    complement: notEmptyStringOrDefault(data.complement, ''),
    sublocality: notEmptyStringOrDefault(data.sublocality, ''),
    city: notEmptyStringOrDefault(data.city, ''),
    state: BRAZILIAN_STATES.acronym.includes(data.state) ? data.state : '',
    lat,
    lng,
    address_lat: lat,
    address_lng: lng,
    geolocation_tolerance: DEFAULT_TOLERANCE,
    radius: DEFAULT_RADIUS,
  }
}

export const requestParserWithOutCoordinates = (
  data: GenericObject,
): IAddress => {
  return {
    postal_code: cepFormatter(notEmptyStringOrDefault(data.postal_code, '')),
    street_type: addressType.includes(data.street_type) ? data.street_type : '',
    street_address: notEmptyStringOrDefault(data.street_address, ''),
    street_number: notEmptyStringOrDefault(data.street_number, ''),
    complement: notEmptyStringOrDefault(data.complement, ''),
    sublocality: notEmptyStringOrDefault(data.sublocality, ''),
    city: notEmptyStringOrDefault(data.city, ''),
    state: BRAZILIAN_STATES.acronym.includes(data.state) ? data.state : '',
    radius: DEFAULT_RADIUS,
  }
}

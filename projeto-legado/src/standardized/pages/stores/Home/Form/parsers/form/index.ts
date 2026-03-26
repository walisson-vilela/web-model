import { GenericObject } from '@mw-kit/mw-ui/types'

import {
  booleanOrDefault,
  cnpj,
  dateOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { Address } from '../../../../../../components/form/sections'
import {
  cepFormatter,
  notEmptyStringOrDefault,
} from '../../../../../../utils/formatters'
import { isObject } from '../../../../../../utils/validators'
import { sourceStatusOrDefault } from '../../../../functions'
import { Form, IFormStores } from '../../interfaces'

const recipientParser = (recipient: GenericObject) => {
  const contacts = Array.isArray(recipient.contacts) ? recipient.contacts : []

  const phones = contacts
    .reduce<string[]>((phones, c) => {
      if (!isObject(c) || c.type !== 'PHONE') return phones
      return [...phones, c.meta.clean]
    }, [])
    .slice(0, 2)

  const email = contacts.find((c) => isObject(c) && c.type === 'EMAIL')

  const parsed: Form['manager_contact'] = {
    // NOME
    name: notEmptyStringOrDefault(recipient.name, ''),
    // TELEFONE 1
    phone_1: phones[0] || '',
    // TELEFONE 2
    phone_2: phones[1] || '',
    // E-MAIL
    email: email ? notEmptyStringOrDefault(email.value, '') : '',
  }

  return parsed
}

const parserCommon = (
  data: GenericObject & { address: GenericObject },
  parsed: Form,
): Form => {
  const address = data.address

  parsed.id = numberOrDefault(data.id, parsed.id)
  parsed.document = notEmptyStringOrDefault(data.document, parsed.document)
  if (parsed.document) parsed.document = cnpj(parsed.document)

  parsed.fantasy_name = notEmptyStringOrDefault(
    data.fantasy_name,
    parsed.fantasy_name,
  )
  parsed.source_status = sourceStatusOrDefault(
    data.source_status,
    parsed.source_status,
  )
  parsed.company_name = notEmptyStringOrDefault(
    data.company_name,
    parsed.company_name,
  )
  parsed.situation_name = notEmptyStringOrDefault(
    data.situation_name,
    parsed.situation_name,
  )

  parsed.postal_code = cepFormatter(
    notEmptyStringOrDefault(address.postal_code, parsed.postal_code),
  )
  parsed.street_type = notEmptyStringOrDefault(
    address.street_type,
    parsed.street_type,
  )
  parsed.street_address = notEmptyStringOrDefault(
    address.street_name,
    parsed.street_address,
  )
  parsed.street_number = notEmptyStringOrDefault(
    address.street_number,
    parsed.street_number,
  )
  parsed.complement = notEmptyStringOrDefault(
    address.complement,
    parsed.complement,
  )
  parsed.sublocality = notEmptyStringOrDefault(
    address.sublocality_name,
    parsed.sublocality,
  )
  parsed.city = notEmptyStringOrDefault(address.city_name, parsed.city)
  parsed.state = notEmptyStringOrDefault(address.state_code, parsed.state)
  parsed.address_lat = numberOrDefault(address.lat, parsed.address_lat)
  parsed.address_lng = numberOrDefault(address.lng, parsed.address_lng)

  if (isObject(data.source_address)) {
    const lat = numberOrDefault(data.source_address.lat)
    const lng = numberOrDefault(data.source_address.lng)

    if (lat !== null && lng !== null) {
      parsed.source_address = {
        formatted: notEmptyStringOrDefault(data.source_address.formatted, ''),
        lat,
        lng,
        city: notEmptyStringOrDefault(data.source_address.city_name, ''),
        complement: notEmptyStringOrDefault(data.source_address.complement, ''),
        postal_code: notEmptyStringOrDefault(
          cepFormatter(data.source_address.postal_code),
          '',
        ),
        state: notEmptyStringOrDefault(data.source_address.state_code, ''),
        street_address: notEmptyStringOrDefault(
          data.source_address.street_name,
          '',
        ),
        street_number: notEmptyStringOrDefault(
          data.source_address.street_number,
        ),
        street_type: notEmptyStringOrDefault(data.source_address.street_type),
        sublocality: notEmptyStringOrDefault(
          data.source_address.sublocality_name,
        ),

        ...('valid_geolocation' in data.source_address
          ? {
              valid_geolocation: booleanOrDefault(
                data.source_address.valid_geolocation,
                false,
              ),
            }
          : {}),
      }
    }
  }

  return parsed
}

const parserStoresContractor = (data: GenericObject, parsed: Form): Form => {
  parsed.code = notEmptyStringOrDefault(data.code, parsed.code)
  parsed.nickname = notEmptyStringOrDefault(data.nickname, parsed.nickname)

  const checkoutMin = numberOrDefault(data.checkout_min)
  const checkoutMax = numberOrDefault(data.checkout_max)

  if (checkoutMin !== null) {
    parsed.checkout = [
      checkoutMin,
      ...(checkoutMax !== null ? [checkoutMax] : []),
    ].join()
  }

  if (isObject(data.coordinate)) {
    parsed.lat = numberOrDefault(data.coordinate.lat, parsed.lat)
    parsed.lng = numberOrDefault(data.coordinate.lng, parsed.lng)
    parsed.radius = numberOrDefault(data.coordinate.radius, parsed.radius)
    parsed.geolocation_tolerance = numberOrDefault(
      data.coordinate.tolerance,
      parsed.geolocation_tolerance,
    )
    parsed.geolocation_status = booleanOrDefault(
      data.coordinate.status,
      parsed.geolocation_status,
    )
    parsed.geolocation_at = dateOrDefault(
      data.coordinate.modified_at,
      parsed.geolocation_at,
      'YYYY-MM-DD HH:mm:ss',
    )

    if (isObject(data.coordinate.modifier)) {
      if ('name' in data.coordinate.modifier) {
        parsed.geolocation_by_id = numberOrDefault(
          data.coordinate.modifier.id,
          parsed.geolocation_by_id,
        )
        parsed.geolocation_by_name = notEmptyStringOrDefault(
          data.coordinate.modifier.name,
          parsed.geolocation_by_name,
        )
      } else if (isObject(data.coordinate.modifier.contractor)) {
        parsed.geolocation_by_name = notEmptyStringOrDefault(
          data.coordinate.modifier.contractor.nickname,
          parsed.geolocation_by_name,
        )
      }
    }
  }

  if (isObject(data.segment)) {
    parsed.segment = {
      id: numberOrDefault(data.segment.id),
      name: notEmptyStringOrDefault(data.segment.name),
    }
  }

  if (isObject(data.market_flag)) {
    parsed.market_flag = {
      id: numberOrDefault(data.market_flag.id),
      name: notEmptyStringOrDefault(data.market_flag.name),

      network: '',
      group: '',

      ...(isObject(data.market_chain)
        ? {
            network: notEmptyStringOrDefault(data.market_chain.name, ''),
          }
        : {}),

      ...(isObject(data.market_group)
        ? {
            group: notEmptyStringOrDefault(data.market_group.name, ''),
          }
        : {}),
    }
  }

  if (isObject(data.typology)) {
    parsed.typology = {
      id: numberOrDefault(data.typology.id),
      name: notEmptyStringOrDefault(data.typology.name),
    }
  }

  if (isObject(data.classification)) {
    parsed.classification = {
      id: numberOrDefault(data.classification.id),
      name: notEmptyStringOrDefault(data.classification.name),
    }
  }

  return parsed
}

const parserStorePDV = (data: GenericObject, parsed: Form): Form => {
  const contacts = data.contacts
  const recipient = data.contact_recipients

  parsed.status = booleanOrDefault(data.status)

  if (Array.isArray(contacts) && contacts.length > 0) {
    parsed.phone = notEmptyStringOrDefault(
      contacts.find((c) => c.type === 'PHONE')?.meta.clean,
      parsed.phone,
    )
    parsed.email = notEmptyStringOrDefault(
      contacts.find((c) => c.type === 'EMAIL')?.value,
      parsed.email,
    )
  }

  if (Array.isArray(recipient) && recipient.length > 0) {
    const contactsBySector = recipient.reduce<{ [k: string]: GenericObject[] }>(
      (parsed, e) => {
        if (!isObject(e)) return parsed
        const sector = notEmptyStringOrDefault(e.sector)
        if (!sector) return parsed
        return { ...parsed, [sector]: [...(parsed[sector] || []), e] }
      },
      {},
    )

    if ('MANAGER' in contactsBySector && contactsBySector.MANAGER[0]) {
      parsed.manager_contact = recipientParser(contactsBySector.MANAGER[0])
    }

    if ('PERSON_IN_CHARGE' in contactsBySector) {
      if (contactsBySector.PERSON_IN_CHARGE[0]) {
        parsed.person_in_charge_1_contact = recipientParser(
          contactsBySector.PERSON_IN_CHARGE[0],
        )
      }

      if (contactsBySector.PERSON_IN_CHARGE[1]) {
        parsed.person_in_charge_2_contact = recipientParser(
          contactsBySector.PERSON_IN_CHARGE[1],
        )
      }
    }
  }

  return parsed
}

const formParser = (
  data: (GenericObject & { address: GenericObject }) | null,
  mode: IFormStores['mode'],
): Form => {
  let parsed: Form = {
    id: null,

    status: true,

    document: null,
    fantasy_name: null,
    company_name: null,
    situation_name: null,
    source_status: null,
    source_address: null,

    code: null,
    nickname: '',
    segment: null,
    market_flag: null,
    typology: null,
    classification: null,
    checkout: null,

    postal_code: '',
    street_type: '',
    street_address: '',
    street_number: '',
    complement: '',
    sublocality: '',
    city: '',
    state: '',
    address_lat: null,
    address_lng: null,

    lat: null,
    lng: null,
    radius: Address.constants.DEFAULT_RADIUS,
    geolocation_tolerance: Address.constants.DEFAULT_TOLERANCE,
    geolocation_status: null,
    geolocation_at: null,
    geolocation_by_id: null,
    geolocation_by_name: null,

    phone: '',
    email: '',
    manager_contact: {
      name: '',
      phone_1: '',
      phone_2: '',
      email: '',
    },
    person_in_charge_1_contact: {
      name: '',
      phone_1: '',
      phone_2: '',
      email: '',
    },
    person_in_charge_2_contact: {
      name: '',
      phone_1: '',
      phone_2: '',
      email: '',
    },
  }

  if (data === null) {
    return parsed
  }

  if (mode === 'base-stores') {
    parsed = parserCommon(data, parsed)
    parsed = parserStoresContractor(data, parsed)
  } else {
    if (!isObject(data.stores_contractor)) {
      return parsed
    }

    parsed = parserCommon(data, parsed)
    parsed = parserStoresContractor(data.stores_contractor, parsed)
    parsed = parserStorePDV(data.stores_contractor, parsed)
  }

  return parsed
}

export default formParser

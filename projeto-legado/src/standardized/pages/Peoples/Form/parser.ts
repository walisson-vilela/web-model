import { GenericObject } from '@mw-kit/mw-ui/types'

import { base64ToFile } from '../../../../utils/FileFormatter'
import {
  dateOrDefault,
  cpf as formatCPF,
  pis as formatPIS,
  numberOrDefault,
} from '../../../../utils/Formatters'
import { isKeyOf } from '../../../../utils/Validators'
import {
  cepFormatter,
  notEmptyStringOrDefault,
  trim,
} from '../../../utils/formatters'
import { isObject } from '../../../utils/validators'

import { Data, Form } from './interfaces'

export const dataParser = (data: GenericObject): Data => {
  const id = numberOrDefault(data.id)

  if (!id) throw new Error('Could not get id')

  const modifier: Data = {
    id,
    modifier: {
      ...(isObject(data.modifier)
        ? {
            ...(data.modifier.id
              ? { id: numberOrDefault(data.modifier.id) }
              : {}),
            name: notEmptyStringOrDefault(data.modifier.name),
          }
        : {
            name: null,
          }),

      at: dateOrDefault(data.modified_at, null, 'YYYY-MM-DD HH:mm:ss'),
    },
  }

  return modifier
}

export const formParser = (data: unknown): Form => {
  const parsed: Form = {
    avatar: null,

    name: '',
    birthdate: '',
    document: '',
    registration: '',
    admission: '',
    pis: '',
    sector: '',

    phone: '',
    phone_2: '',

    email: '',

    note: '',

    postal_code: '',
    street_type: '',
    street_address: '',
    street_number: '',
    complement: '',
    sublocality: '',
    city: '',
    state: '',

    lat: null,
    lng: null,
    radius: 50,
    geolocation_at: null,
    geolocation_by_id: null,
    geolocation_by_name: null,
  }

  if (!isObject(data)) return parsed

  if (isObject(data.avatar)) {
    parsed.avatar = notEmptyStringOrDefault(data.avatar.url, parsed.avatar)
  }

  parsed.name = notEmptyStringOrDefault(data.name, parsed.name)
  parsed.birthdate = dateOrDefault(
    data.birthdate,
    parsed.birthdate,
    'DD/MM/YYYY',
  )

  parsed.document = notEmptyStringOrDefault(data.document, parsed.document)
  if (parsed.document) parsed.document = formatCPF(parsed.document)

  parsed.registration = notEmptyStringOrDefault(
    data.registration,
    parsed.registration,
  )

  parsed.admission = dateOrDefault(
    data.admission,
    parsed.birthdate,
    'DD/MM/YYYY',
  )

  parsed.pis = notEmptyStringOrDefault(data.pis, parsed.pis)
  if (parsed.pis) parsed.pis = formatPIS(parsed.pis)

  parsed.sector = notEmptyStringOrDefault(data.sector, parsed.sector)

  if (isObject(data.address)) {
    parsed.postal_code = cepFormatter(
      notEmptyStringOrDefault(data.address.postal_code, parsed.postal_code),
    )
    parsed.street_type = notEmptyStringOrDefault(
      data.address.street_type,
      parsed.street_type,
    )
    parsed.street_address = notEmptyStringOrDefault(
      data.address.street_name,
      parsed.street_address,
    )
    parsed.street_number = notEmptyStringOrDefault(
      data.address.street_number,
      parsed.street_number,
    )
    parsed.complement = notEmptyStringOrDefault(
      data.address.complement,
      parsed.complement,
    )
    parsed.sublocality = notEmptyStringOrDefault(
      data.address.sublocality_name,
      parsed.sublocality,
    )
    parsed.city = notEmptyStringOrDefault(data.address.city_name, parsed.city)
    parsed.state = notEmptyStringOrDefault(
      data.address.state_code,
      parsed.state,
    )
  }

  if (isObject(data.coordinate)) {
    parsed.lat = numberOrDefault(data.coordinate.lat, parsed.lat)
    parsed.lng = numberOrDefault(data.coordinate.lng, parsed.lng)
    parsed.radius = numberOrDefault(data.coordinate.radius, parsed.radius)

    parsed.geolocation_at = dateOrDefault(
      data.coordinate.modified_at,
      parsed.geolocation_at,
      'YYYY-MM-DD HH:mm:ss',
    )
    if (isObject(data.coordinate.modifier)) {
      parsed.geolocation_by_id = numberOrDefault(
        data.coordinate.modifier.id,
        parsed.geolocation_by_id,
      )
      parsed.geolocation_by_name = notEmptyStringOrDefault(
        data.coordinate.modifier.name,
        parsed.geolocation_by_name,
      )
    }
  }

  const contacts = (Array.isArray(data.contacts) ? data.contacts : []).reduce<{
    [K in 'PHONE' | 'EMAIL']: string[]
  }>(
    (contacts, c) => {
      if (!isObject(c)) return contacts

      const type = notEmptyStringOrDefault<string>(c.type, '')
      if (type === 'PHONE') {
        if (!isObject(c.meta)) return contacts
        const value = notEmptyStringOrDefault(c.meta.clean)

        return value
          ? {
              ...contacts,
              [type]: [...contacts[type], trim(value, '+')],
            }
          : contacts
      }

      const value = notEmptyStringOrDefault(c.value)
      if (value && isKeyOf(contacts, type)) {
        return {
          ...contacts,
          [type]: [...contacts[type], c.value],
        }
      }

      return contacts
    },
    {
      PHONE: [],
      EMAIL: [],
    },
  )

  parsed.phone = contacts.PHONE[0] ?? parsed.phone
  parsed.phone_2 = contacts.PHONE[1] ?? parsed.phone_2

  parsed.email = contacts.EMAIL[0] ?? parsed.email

  parsed.note = notEmptyStringOrDefault(data.complement, parsed.note)

  return parsed
}

export const saveParser = async (
  form: Form,
  checkDirty: (field: keyof Form) => boolean,
) => {
  const isDirty = (field: keyof Form | (keyof Form)[]) => {
    return (Array.isArray(field) ? field : [field]).some(checkDirty)
  }

  const payload = {
    ...(isDirty('avatar')
      ? {
          avatar: form.avatar
            ? { file: await base64ToFile(form.avatar) }
            : null,
        }
      : {}),

    ...(isDirty('name') ? { name: form.name } : {}),
    ...(isDirty('birthdate')
      ? {
          birthdate: dateOrDefault(
            form.birthdate,
            null,
            'YYYY-MM-DD',
            'DD/MM/YYYY',
          ),
        }
      : {}),
    ...(isDirty('document') ? { document: form.document } : {}),
    ...(isDirty('registration')
      ? { registration: notEmptyStringOrDefault(form.registration) }
      : {}),
    ...(isDirty('admission')
      ? {
          admission: dateOrDefault(
            form.admission,
            null,
            'YYYY-MM-DD',
            'DD/MM/YYYY',
          ),
        }
      : {}),
    ...(isDirty('pis') ? { pis: notEmptyStringOrDefault(form.pis) } : {}),
    ...(isDirty('sector')
      ? { sector: notEmptyStringOrDefault(form.sector) }
      : {}),

    ...(isDirty([
      'postal_code',
      'street_type',
      'street_address',
      'street_number',
      'complement',
      'sublocality',
      'city',
      'state',
    ])
      ? {
          address: {
            postal_code: form.postal_code,
            street_type: form.street_type,
            street_name: form.street_address,
            street_number: form.street_number,
            complement: form.complement,
            sublocality_name: form.sublocality,
            city_name: form.city,
            state_code: form.state,
            country_name: 'Brasil',
          },
        }
      : {}),

    ...(isDirty(['lat', 'lng', 'radius'])
      ? {
          coordinate: {
            lat: form.lat,
            lng: form.lng,
            radius: form.radius,
          },
        }
      : {}),

    ...(isDirty(['phone', 'phone_2', 'email'])
      ? {
          contacts: [
            [form.phone, 'PHONE'],
            [form.phone_2, 'PHONE'],

            [form.email, 'EMAIL'],
          ].reduce((acc, [value, type]) => {
            value = notEmptyStringOrDefault(value)
            return value ? [...acc, { type, value }] : acc
          }, [] as { type: string; value: string }[]),
        }
      : {}),

    ...(isDirty('note')
      ? { complement: notEmptyStringOrDefault(form.note) }
      : {}),
  }

  return payload
}

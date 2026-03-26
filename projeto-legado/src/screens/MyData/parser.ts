import { GenericObject } from '@mw-kit/mw-ui/types'
import { FormState } from 'react-hook-form'

import { base64ToFile } from '../../utils/FileFormatter'
import {
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../utils/Formatters'
import { isObject } from '../../utils/Validators'

import { Data, Form } from './interfaces'

const parseModifier = (data: GenericObject): Data['modifier'] => ({
  ...(isObject(data.modifier)
    ? {
        ...(data.modifier.id ? { id: numberOrDefault(data.modifier.id) } : {}),
        name: notEmptyStringOrDefault(data.modifier.name),
      }
    : {
        name: null,
      }),

  at: dateOrDefault(data.modified_at, null, 'YYYY-MM-DD HH:mm:ss'),
})

export const requestParser = (data: any): Data => {
  const parsed: Data = {
    id: null,
    username: null, // login
    name: null, // nome do usuário
    document: null, // cpf
    pis: null, // pis
    birthday: null, // nascimento
    re: null, // re
    admission: null, // data admissão
    sector: null, // setor
    street_type: null, //  logradouro
    street_address: null,
    street_number: null,
    complement: null,
    sublocality: null,
    city: null,
    state: null,
    postal_code: null,
    phone: null,
    mobile_phone: null,
    email: null,
    avatar: {
      avatar: '',
    },
    modifier: null,
  }

  if (!isObject(data) || !isObject(data.user)) {
    return parsed
  }

  parsed.id = numberOrDefault(data.id, 0)
  parsed.name = notEmptyStringOrDefault(data.name, '')

  if (isObject(data.user.authentication)) {
    parsed.username = notEmptyStringOrDefault(
      data.user.authentication.username,
      '',
    )
  }

  if (isObject(data.user.person)) {
    parsed.document = notEmptyStringOrDefault(data.user.person.document, '')
    parsed.pis = notEmptyStringOrDefault(data.user.person.pis, '')
    parsed.birthday = notEmptyStringOrDefault(data.user.person.birthdate, '')
    parsed.re = notEmptyStringOrDefault(data.user.person.registration, '')
    parsed.admission = notEmptyStringOrDefault(data.user.person.admission, '')
    parsed.sector = notEmptyStringOrDefault(data.user.person.sector, '')
    parsed.modifier = parseModifier(data.user.person)
  } else parsed.modifier = parseModifier(data.user)

  if (isObject(data.user.address)) {
    parsed.street_type = notEmptyStringOrDefault(
      data.user.address.street_type,
      '',
    )
    parsed.street_number = notEmptyStringOrDefault(
      data.user.address.street_number,
      '',
    )
    parsed.street_address = notEmptyStringOrDefault(
      data.user.address.street_name,
      '',
    )
    parsed.complement = notEmptyStringOrDefault(
      data.user.address.complement,
      '',
    )
    parsed.sublocality = notEmptyStringOrDefault(
      data.user.address.sublocality_name,
      '',
    )
    parsed.city = notEmptyStringOrDefault(data.user.address.city_name, '')
    parsed.state = notEmptyStringOrDefault(data.user.address.state_code, '')
    parsed.postal_code = notEmptyStringOrDefault(
      data.user.address.postal_code,
      '',
    )
  }

  const contacts = (
    Array.isArray(data.user.contacts) ? data.user.contacts : []
  ).reduce<{
    [k in 'PHONE' | 'EMAIL']: string[]
  }>(
    (contacts, c) => {
      if (!isObject(c)) return contacts

      if (c.type in contacts) {
        return {
          ...contacts,
          [c.type]: [...contacts[c.type], c.value],
        }
      }

      return contacts
    },
    {
      PHONE: [],
      EMAIL: [],
    },
  )

  parsed.phone = contacts.PHONE[0] || null
  parsed.mobile_phone = contacts.PHONE[1] || null
  parsed.email = contacts.EMAIL[0] || null

  if (isObject(data.user.avatar)) {
    parsed.avatar.avatar = notEmptyStringOrDefault(data.user.avatar.url)
  }

  return parsed
}

export const formParser = (data: Data): Form => {
  const parsed: Form = {
    avatar: '',
    phone: '',
    mobile_phone: '',
    email: '',
  }

  if (!isObject(data)) return parsed

  parsed.avatar = notEmptyStringOrDefault(data.avatar.avatar, '')
  parsed.phone = notEmptyStringOrDefault(data.phone, '')
  parsed.mobile_phone = notEmptyStringOrDefault(data.mobile_phone, '')
  parsed.email = notEmptyStringOrDefault(data.email, '')

  return parsed
}

export const saveParser = async (
  formData: Form,
  dirtyFields: FormState<Form>['dirtyFields'],
) => {
  const contacts: Partial<{ [K in keyof Form]: 'EMAIL' | 'PHONE' }> = {
    phone: 'PHONE',
    mobile_phone: 'PHONE',
    email: 'EMAIL',
  }

  const payload = {
    ...('avatar' in dirtyFields
      ? {
          avatar: formData.avatar
            ? {
                file: await base64ToFile(formData.avatar, 'avatar.png'),
              }
            : '',
        }
      : {}),

    ...(Object.keys(contacts).some((f) => f in dirtyFields)
      ? {
          contacts: Object.entries(contacts).reduce<
            {
              type: 'EMAIL' | 'PHONE'
              value: string
            }[]
          >((contacts, [field, type]) => {
            const value = notEmptyStringOrDefault(formData[field])
            return value
              ? [
                  ...contacts,
                  {
                    type,
                    value,
                  },
                ]
              : contacts
          }, []),
        }
      : {}),
  }

  return payload
}

import { isObject } from 'lodash'

import {
  booleanOrDefault,
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../utils/Formatters'

import { DataInterface } from './interfaces'

const parser = (data: any): DataInterface => {
  const parsed: DataInterface = {
    id: numberOrDefault(data.id),
    document: notEmptyStringOrDefault(data.document),
    company_name: notEmptyStringOrDefault(data.company_name),
    name: notEmptyStringOrDefault(data.name),
    category: null,
    state_registration: notEmptyStringOrDefault(data.state_registration),
    municipal_registration: notEmptyStringOrDefault(
      data.municipal_registration,
    ),
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
    client_category_id: numberOrDefault(data.client_category_id),
    postal_code: notEmptyStringOrDefault(data.postal_code),
    street_type: notEmptyStringOrDefault(data.street_type),
    street_address: notEmptyStringOrDefault(data.street_address),
    street_number: notEmptyStringOrDefault(data.street_number),
    complement: notEmptyStringOrDefault(data.complement),
    sublocality: notEmptyStringOrDefault(data.sublocality),
    city: notEmptyStringOrDefault(data.city),
    state: notEmptyStringOrDefault(data.state),
    phone1: notEmptyStringOrDefault(data.phone1),
    phone2: notEmptyStringOrDefault(data.phone2),
    email: notEmptyStringOrDefault(data.email),
    total_licences: numberOrDefault(data.total_licences),
    minimum_licenses: numberOrDefault(data.minimum_licenses),
    licenses_in_use: numberOrDefault(data.licenses_in_use),
    administrator_name: notEmptyStringOrDefault(data.administrator_name),
    administrator_phone: notEmptyStringOrDefault(data.administrator_phone),
    administrator_sector: notEmptyStringOrDefault(data.administrator_sector),
    administrator_email: notEmptyStringOrDefault(data.administrator_email),
    status: notEmptyStringOrDefault(data.status),
    account_master_id: numberOrDefault(data.account_master_id),
    space_used: numberOrDefault(data.space_used),
    space_free: numberOrDefault(data.space_free),
    space_total: numberOrDefault(data.space_total),
    automatic_user_approval: booleanOrDefault(data.automatic_user_approval),
    administrator_id: numberOrDefault(data.administrator_id),
    created_at: notEmptyStringOrDefault(data.created_at),
    account_master: null,
    client_contacts: null,
    administrator: null,
  }

  if (isObject(data.category)) {
    parsed.category = {
      id: numberOrDefault(data.category.id),
      name: notEmptyStringOrDefault(data.category.name),
    }
  }

  if (isObject(data.account_master)) {
    parsed.account_master = {
      id: numberOrDefault(data.account_master.id),
      name: notEmptyStringOrDefault(data.account_master.name),
    }
  }

  if (Array.isArray(data.client_contacts)) {
    parsed.client_contacts = data.client_contacts.map((e: any) => ({
      id: numberOrDefault(e.id),
      client_id: numberOrDefault(e.client_id),
      client_contact_type_id: numberOrDefault(e.client_contact_type_id),
      name: notEmptyStringOrDefault(e.name),
      phone1: notEmptyStringOrDefault(e.phone1),
      phone2: notEmptyStringOrDefault(e.phone2),
      email: notEmptyStringOrDefault(e.email),
    }))
  }

  if (isObject(data.administrator)) {
    parsed.administrator = {
      id: numberOrDefault(data.administrator.id),
      name: notEmptyStringOrDefault(data.administrator.name),
      phone: notEmptyStringOrDefault(data.administrator.phone),
      email: notEmptyStringOrDefault(data.administrator.email),
      decoded_json_fields: data.administrator.decoded_json_fields || null,
    }
  }

  return parsed
}

export default parser

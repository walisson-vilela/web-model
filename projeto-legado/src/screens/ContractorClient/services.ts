import axios from '../../services/Axios'
import { notEmptyStringOrDefault } from '../../standardized/utils/formatters'
import { isObject } from '../../standardized/utils/validators'
import { getToken } from '../../utils'
import { numberOrDefault } from '../../utils/Formatters'

import { MasterAdminInterface } from './interfaces'

export const getClient = async (id: number): Promise<any> => {
  const { data } = await axios.get(`v1/clients/${id}`)

  return data
}

export const getMasterAdmin = async (): Promise<{
  data: MasterAdminInterface
}> => {
  const { data: response } = await axios.get('v1/tr/users/master')

  if (
    !isObject(response) ||
    response.success !== true ||
    !isObject(response.data)
  ) {
    throw new Error('Invalid response')
  }

  const id = numberOrDefault(response.data.id)
  if (!id) {
    throw new Error('Invalid response')
  }

  const contacts = (
    Array.isArray(response.data.contacts) ? response.data.contacts : []
  ).reduce<{
    [k in 'PHONE' | 'EMAIL']: string[]
  }>(
    (contacts, c) => {
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

  const masterAdmin: MasterAdminInterface = {
    id,
    name: notEmptyStringOrDefault(response.data.name, ''),

    phone: contacts.PHONE[0] || null,
    mobile_phone: contacts.PHONE[1] || null,
    mobile_phone_2: contacts.PHONE[2] || null,
    work_phone: contacts.PHONE[3] || null,
    email: contacts.EMAIL[0] || null,

    sector: notEmptyStringOrDefault(response.data.person.sector),
    people_id_name: '',
  }

  masterAdmin.people_id_name = [masterAdmin.id, masterAdmin.name].join(' - ')

  return { data: masterAdmin }
}

export const getContractInfo = async (): Promise<any> => {
  const { data } = await axios.get('v1/tr/clients/view')

  return data
}

export const getClientId = async (): Promise<number> => {
  const token = getToken()
  return token.payload.client
}

export const updateClient = async (id: number, body: Object): Promise<any> => {
  const { data } = await axios.put(`v1/clients/${id}`, body)
  return data
}

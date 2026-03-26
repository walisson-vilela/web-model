import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../services/Axios'
import { booleanOrDefault, numberOrDefault } from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'
import { ValidationError } from '../../../components/form/modals'

import { Form } from './interfaces'
import { saveParser } from './parser'

export const getPerson = async (id: number): Promise<GenericObject> => {
  const { data } = await axios.get(`/v1/tr/persons/${id}`)

  if (!data.success) throw new Error('Request returned no sucess!')
  if (!isObject(data.data)) throw new Error('Request returned an invalid data!')

  return data.data
}

export const savePerson = async (
  values: Form,
  dirtyFields: (keyof Form)[],
  id?: number | null,
): Promise<
  { success: true; id: number } | { success: false; errors: GenericObject }
> => {
  const [sufix, isDirty, getId] = id
    ? [
        `/edit/${id}`,
        (field: keyof Form) => dirtyFields.includes(field),
        () => id,
      ]
    : [
        '',
        () => true,
        (response: GenericObject) => {
          if (!isObject(response.data)) {
            throw new Error('Missing data!')
          }

          const id = numberOrDefault(response.data.id)
          if (id === null) {
            throw new Error('Missing id!')
          }

          return id
        },
      ]

  const payload = await saveParser(values, isDirty)

  const { data } = await ValidationError.handler(async () => {
    return await axios.post(`v1/tr/persons${sufix}`, payload, {
      ...(payload.avatar
        ? {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        : {}),
    })
  })

  if (!isObject(data)) {
    throw new Error('Invalid response')
  }

  const success = booleanOrDefault(data.success)
  if (success === null) {
    throw new Error('Missing success status')
  }

  if (success === false) {
    if (!isObject(data.errors)) throw new Error('Missing errors')
    return { success, errors: data.errors }
  }

  return { success, id: getId(data) }
}

export const setting250 = async (): Promise<boolean> => {
  const { data: response } = await axios.get('/v1/account-settings/250')

  if (!response.success || !isObject(response.data)) {
    throw new Error('Request returned no sucess!')
  }

  if (!isObject(response.data.settings_decoded)) return false

  return response.data.settings_decoded.current_type === 're'
}

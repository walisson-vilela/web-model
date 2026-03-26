import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../services/Axios'
import { booleanOrDefault } from '../../../../../../utils/Formatters'
import { ValidationError } from '../../../../../components/form/modals'
import { isObject } from '../../../../../utils/validators'

import { Form } from './interfaces'
import { saveParser } from './parser'

export const createEditRoles = async (
  form: Form,
  dirtyFields: (keyof Form)[],
  id?: number,
): Promise<{ success: true } | { success: false; errors: GenericObject }> => {
  const params = saveParser(form, dirtyFields, id ? 'edit' : 'create')

  const { data: response } = await ValidationError.handler(async () => {
    return id
      ? await axios.put(`/v1/tr/roles/${id}`, params)
      : await axios.post('/v1/tr/roles', params)
  })
  if (!isObject(response)) {
    throw new Error('Invalid response')
  }

  const success = booleanOrDefault(response.success)
  if (success === null) {
    throw new Error('Missing success status')
  }

  if (success) return { success }

  if (!isObject(response.errors)) throw new Error('Missing errors')

  return { success, errors: response.errors }
}

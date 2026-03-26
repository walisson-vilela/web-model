import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../services/Axios'
import { ValidationError } from '../../../../../standardized/components/form/modals'
import { booleanOrDefault } from '../../../../../utils/Formatters'
import { isObject } from '../../../../../utils/Validators'

import { FormInterface } from './interfaces'

export const save = async (
  form: FormInterface,
  id: number = null,
): Promise<{ success: true } | { success: false; errors: GenericObject }> => {
  const { data: response } = await ValidationError.handler(async () => {
    return id
      ? await axios.put(`/v1/tr/suppliers/${id}`, form)
      : await axios.post('/v1/tr/suppliers', form)
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

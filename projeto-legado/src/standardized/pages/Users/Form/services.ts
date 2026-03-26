import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../services/Axios/instance'
import { booleanOrDefault } from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'
import { ValidationError } from '../../../components/form/modals'
import { PERSON_STATUS } from '../labels'

import { Data, Form } from './interfaces'
import { dataParser, formParser, saveParser } from './parser'

export const getUser = async (
  id: number,
): Promise<{
  form: Form
  data: Data
}> => {
  const { data } = await axios.get(`v1/tr/users/${id}`)

  if (!data.success) throw new Error('Request returned no sucess!')
  if (!isObject(data.data)) throw new Error('Request returned an invalid data!')

  return {
    form: formParser(data.data),
    data: dataParser(data.data),
  }
}

export const saveUser = async (
  values: Form,
  dirtyFields: (keyof Form)[],
  id: number,
  activation?: Date,
): Promise<{ success: true } | { success: false; errors: GenericObject }> => {
  const payload = saveParser(
    values,
    values.status === PERSON_STATUS.PC.value
      ? () => true
      : (field) => dirtyFields.includes(field),
    activation,
  )

  const { data } = await ValidationError.handler(async () => {
    return await axios.put(`v1/tr/users/${id}`, payload)
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

  return { success }
}

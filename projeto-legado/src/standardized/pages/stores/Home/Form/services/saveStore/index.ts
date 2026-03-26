import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../services/Axios/instance'
import {
  booleanOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'
import ValidationError from '../../../../../../components/form/modals/ValidationError'
import { Form, IFormStores } from '../../interfaces'
import { saveParser } from '../../parsers'

const saveStore = async (
  form: Form,
  dirtyFields: (keyof Form)[],
  editId: number | null = null,
  mode: IFormStores['mode'],
): Promise<
  { success: true; id: number } | { success: false; errors: GenericObject }
> => {
  const payload = saveParser(form, dirtyFields, editId, mode)

  const { data } = await ValidationError.handler(async () => {
    return await axios.post('/v1/tr/stores', payload)
  })

  if (!isObject(data)) throw new Error('Request returned an invalid data!')

  const success = booleanOrDefault(data.success)
  if (success === null) {
    throw new Error('Missing success status')
  }

  if (success === false) {
    if (!isObject(data.errors)) throw new Error('Missing errors')
    console.error(data.errors)
    return { success, errors: data.errors }
  }

  if (editId) return { success: true, id: editId }

  if (!isObject(data.data)) throw new Error('Request returned an invalid data!')

  const id = numberOrDefault(data.data.id)
  if (id === null) throw new Error('Request returned an invalid id!')

  return { success: true, id }
}

export default saveStore

import axios from '../../../../../services/Axios'
import { isObject } from '../../../../utils/validators'

import { Form } from './interfaces'
import { save } from './parsers'

export const submit = async (
  formData: Form,
  id: number | null,
): Promise<void> => {
  const payload = save(formData)

  const { data: response } = id
    ? await axios.put(`/v1/classifications/edit/${id}`, payload)
    : await axios.post('/v1/classifications/add', payload)

  if (!isObject(response) || !response.success) {
    throw new Error('Invalid response')
  }
}

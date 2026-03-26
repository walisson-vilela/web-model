import axios from '../../../../../services/Axios'
import { isObject } from '../../../../../utils/Validators'

import { Form } from './interfaces'

export const submit = async (
  formData: Form,
  id: number,
  hierarchy_id: number,
): Promise<void> => {
  const payload = { ...formData, hierarchy_id }

  const { data: response } = id
    ? await axios.put(`/v1/tr/regions/${id}`, payload)
    : await axios.post('/v1/tr/regions', payload)

  if (!isObject(response) || !response.success) {
    throw new Error('Response failed')
  }
}

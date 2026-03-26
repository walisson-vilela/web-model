import axios from '../../../../../../services/Axios'
import { isObject } from '../../../../../../utils/Validators'

import { Form } from './interfaces'

export const submit = async (
  formData: Form,
  id: number,
): Promise<void> => {
  const payload = { ...formData }

  const { data: response } = await axios.post('/v1/epis/', payload)

  if (!isObject(response) || !response.success) {
    throw new Error('Response failed')
  }
}

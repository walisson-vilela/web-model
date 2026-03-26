import axios from '../../../../../../services/Axios'
import { isObject } from '../../../../../../utils/Validators'

import { Form } from './interfaces'

export const submit = async (
  formData: Form,
  epi_id: number,
): Promise<void> => {
  const payload = { ...formData, epi_id }

  const { data: response } = await axios.post('/v1/epi-inventory-manual-decreases/add', payload)

  if (!isObject(response) || !response.success) {
    throw new Error('Response failed')
  }
}

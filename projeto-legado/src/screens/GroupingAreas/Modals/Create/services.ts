import axios from '../../../../services/Axios'

import { Form } from './interfaces'

export const save = async (
  form: Form,
  id: string = null,
  hierarchy_id: number,
): Promise<any> => {
  const params = { ...form, country_id: form.country_id, hierarchy_id }

  const { data } = id
    ? await axios.put(`/v1/tr/grouping-areas/${id}`, params)
    : await axios.post('/v1/tr/grouping-areas', params)

  if (!data.success) throw new Error('Save returned no sucess!')

  return data
}

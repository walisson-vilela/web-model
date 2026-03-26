import axios from '../../../../../services/Axios'

import { formType } from './interfaces'

export const submit = async (formData: formType, id: number): Promise<any> => {
  const { data } = id
    ? await axios.put(`/v1/tr/markets/edit/${id}`, formData)
    : await axios.post('/v1/tr/markets/add', formData)

  // Retornando o conteúdo do body da requisição
  return data
}

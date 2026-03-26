import axios from '../../../../../services/Axios'

import { formType } from './interfaces'

export const validateName = async (
  search: string,
  parent_id: string | number,
  id: number | null,
): Promise<any> => {
  const params: any = { name: search, parent_id }

  if (id) params.id = id

  const { data } = await axios.get('/v1/tr/categories/check-name', { params })

  // Retornando o conteúdo do body da requisição
  return data
}

export const submit = async (formData: formType): Promise<any> => {
  const { id = null } = formData

  const { data } = id
    ? await axios.put(`/v1/tr/categories/edit/${id}`, formData)
    : await axios.post('/v1/tr/categories/add', formData)

  // Retornando o conteúdo do body da requisição
  return data
}

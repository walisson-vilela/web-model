import axios from '../../../../../services/Axios'

import { IFormType } from './interfaces'

// Essa função irá salvar as alterações no cadastro.
export const submit = async (formData: IFormType, id: number): Promise<any> => {
  const { data } = id
    ? await axios.put(`/v1/tr/typologies/edit/${id}`, formData)
    : await axios.post('/v1/tr/typologies/add', { ...formData, active: true })

  // Retornando o conteúdo do body da requisição
  return data
}

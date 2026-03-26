import axios from '../../../../../../services/Axios'
import { isObject } from '../../../../../../utils/Validators'

export const getFileProcess = async (id: number): Promise<any> => {
  const { data } = await axios.get(`/v1/file-processes/${id}`)

  if (!data.success) throw new Error('Request returned no sucess!')
  if (!isObject(data.data)) throw new Error('Request returned an invalid data!')

  return data.data
}

export const editFileProcess = async (
  id: number,
  params: any,
): Promise<any> => {
  const { data } = await axios.put(`/v1/file-processes/${id}`, params)

  if (!data.success) throw new Error('Request returned no sucess!')
}

// Essa função irá verificar se o nome está disponível.
export const validateName = async (
  name: string,
  type: string,
  id: number,
): Promise<any> => {
  const params: any = { name, type }

  if (id) params.id = id

  const { data } = await axios.post('/v1/file-processes/check-name', params)

  // Retornando o conteúdo do body da requisição
  return data
}

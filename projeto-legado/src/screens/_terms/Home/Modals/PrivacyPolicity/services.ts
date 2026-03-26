import axios from '../../../../../services/Axios'

// Essa função irá fazer a requisição ou extração dos dados.
export const getData = async (id: number): Promise<any> => {
  const { data } = await axios.get(`/v1/tr/contractor-terms/index?id=${id}`)
  // Retornando o conteúdo do body da requisição
  return data
}

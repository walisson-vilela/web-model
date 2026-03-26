import axios from '../../../../services/Axios'

// Essa função irá fazer a requisição ou extração dos dados.
export const getForms = async (): Promise<any> => {
  const { data } = await axios.get('/v1/forms', {})

  // Retornando o conteúdo do body da requisição
  return data
}

import axios from '../../../services/Axios'

// Essa função irá fazer a requisição ou extração dos dados.
export const save = async (form): Promise<any> => {
  //const params: FormData = objectToFormData(form)

  const { data } = await axios.post('/v1/file-imports/add', form)

  // Retornando o conteúdo do body da requisição
  return data
}

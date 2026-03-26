import axios from '../../../../services/Axios'

export const downloadPPT = async (payload: any): Promise<any> => {
  const { data } = await axios.post('/v1/file-processes', payload)
  // FIXME: Alterar endpoint

  return data
}

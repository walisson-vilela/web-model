import axios from '../../../../services/Axios'

export const downloadZip = async (payload: any): Promise<any> => {
  const { data } = await axios.post('/v1/file-processes', payload)
  // FIXME: Alterar endpoint

  return data
}

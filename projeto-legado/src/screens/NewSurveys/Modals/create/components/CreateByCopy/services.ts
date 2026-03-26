import axios from '../../../../../../services/Axios'

export const listCopy = async (search: string, page: number): Promise<any> => {
  const params: any = { page }

  if (search) params.q = search

  const { data } = await axios.get(`/v1/tr/surveys`, { params })

  if (!data.success) throw new Error('Request returned no sucess!')

  return data
}

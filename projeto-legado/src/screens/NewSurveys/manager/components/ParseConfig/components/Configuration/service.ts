import axios from '../../../../../../../services/Axios'

export const getData = async (id: number): Promise<any> => {
  const params: any = { contain: 'Parents' }
  const { data } = await axios.get(`/v1/tr/surveys/view/${id}`, { params })

  if (!data.success) throw new Error('Invalid Request')

  return data.data
}

export const editConfig = async (id: number, payload: any): Promise<any> => {
  const { data } = await axios.put(`/v1/tr/surveys/edit/${id}`, { ...payload })

  return data
}

import axios from '../../../../../../../../services/Axios'

export const getPhoto = async (id: number): Promise<any> => {
  const { data } = await axios.get(
    `/v1/tr/stores/statistic-attendances/confirmation-check/${id}`,
  )

  if (!data.success) throw new Error('Invalid Request')
  return data.data
}

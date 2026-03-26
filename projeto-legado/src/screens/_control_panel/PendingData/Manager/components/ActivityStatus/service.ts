import axios from '../../../../../../services/Axios'

export const getFailsData = async (id: number): Promise<any> => {
  const { data } = await axios.get(
    `/v1/tr/statistic-parked-registries/connection-level/${id}`,
  )

  if (!data.success) throw new Error('Invalid request!')

  return data.data
}

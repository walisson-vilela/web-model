import axios from '../../../../../../../services/Axios'

export const request = async (store_id: number): Promise<any> => {
  const { data } = await axios.get(
    `/v1/tr/stores/statistic-attendances/check-notification/${store_id}`,
  )

  return data.data
}

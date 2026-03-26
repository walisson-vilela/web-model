import axios from '../../../../../../../services/Axios'

export const request = async (
  statistic_attendances_id: number,
): Promise<any> => {
  const { data } = await axios.get(
    `/v1/tr/stores/statistic-attendances/check-notification/${statistic_attendances_id}`,
  )

  return data.data
}

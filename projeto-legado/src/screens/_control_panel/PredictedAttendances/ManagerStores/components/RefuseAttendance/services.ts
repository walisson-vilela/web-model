import axios from '../../../../../../services/Axios'

export const toggleStatus = async (payload: any) => {
  const { data } = await axios.put(
    '/v1/tr/stores/statistic-attendances/toggle-status',
    payload,
  )

  if (!data.success) throw new Error('Invalid request')
  return data
}

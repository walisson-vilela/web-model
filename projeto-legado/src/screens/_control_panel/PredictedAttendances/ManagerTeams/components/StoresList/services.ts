import axios from '../../../../../../services/Axios'

export const getStores = async (filters: Object): Promise<any> => {
  const params = { ...filters }

  const { data } = await axios.get(
    '/v1/tr/stores/statistic-attendances/list-by-panorama-peoples',
    { params },
  )

  return data
}

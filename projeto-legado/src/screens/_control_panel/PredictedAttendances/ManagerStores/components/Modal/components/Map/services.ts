import axios from '../../../../../../../../services/Axios'

export const getCoordinates = async (id: number): Promise<any> => {
  const { data } = await axios.get(
    `/v1/tr/stores/statistic-attendances/confirmation-check/${id}`,
  )
  return data.data
}

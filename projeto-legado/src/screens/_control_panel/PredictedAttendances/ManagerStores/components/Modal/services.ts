import axios from '../../../../../../services/Axios'

export const getStoresDetails = async (store_id: number): Promise<any> => {
  const { data } = await axios.get(`/v1/stores/view/${store_id}`)
  return data.data
}

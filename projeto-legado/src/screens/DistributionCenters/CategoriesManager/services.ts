import axios from '../../../services/Axios'

export const updateCategories = async (
  distribution_center_id: number,
  categories: number[],
): Promise<any> => {
  const { data } = await axios.post(
    `/v1/distribution-centers/${distribution_center_id}/categories`,
    categories,
  )

  return data
}

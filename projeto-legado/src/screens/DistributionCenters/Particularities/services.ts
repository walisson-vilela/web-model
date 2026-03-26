import axios from '../../../services/Axios'
import { notEmptyString } from '../../../utils/Validators'

export const getCategories = async (
  distribution_center_id: number,
  search?: string,
  historic?: boolean,
): Promise<any> => {
  const key = historic
    ? 'contain_distribution_center_historic_id'
    : 'contain_distribution_center_id'

  const params: any = {
    level: 2,
    'no-limit': 1,
    limit: 200,
  }

  params[key] = distribution_center_id

  if (notEmptyString(search)) params.name = search

  const { data } = await axios.get('/v1/tr/categories', { params })

  return data
}

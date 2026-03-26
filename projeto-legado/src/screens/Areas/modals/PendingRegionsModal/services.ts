import axios from '../../../../services/Axios'
import { isObject } from '../../../../utils/Validators'

export const save = async (global_region_ids: number[]): Promise<void> => {
  const { data: response } = await axios.post(
    '/v1/tr/regions/edit-region-details',
    { global_region_ids },
  )
  if (!isObject(response) || response.success !== true)
    throw new Error('Request returned no success')
}

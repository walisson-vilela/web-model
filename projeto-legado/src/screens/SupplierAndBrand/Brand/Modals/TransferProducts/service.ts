import axios from '../../../../../services/Axios/instance'
import { isObject } from '../../../../../utils/Validators'

export const saveSelected = async (
  product_ids: number[],
  brand_id: number,
): Promise<void> => {
  const params = { brand_id, ids: product_ids }

  const { data } = await axios.put('/v1/tr/products/toggle-brand-id', params)

  if (!isObject(data) || !data.success) {
    throw new Error('Invalid Response')
  }
}

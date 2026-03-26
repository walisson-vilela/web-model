import axios from '../../../../../services/Axios/instance'
import { isObject } from '../../../../../utils/Validators'

export const transferPDVs = async (
  store_ids: number[],
  typology_id: number,
): Promise<void> => {
  const params = { ids: store_ids }

  const { data } = await axios.post(
    `/v1/tr/typologies/${typology_id}/stores`,
    params,
  )

  if (!isObject(data) || !data.success) {
    throw new Error('Invalid Response')
  }
}

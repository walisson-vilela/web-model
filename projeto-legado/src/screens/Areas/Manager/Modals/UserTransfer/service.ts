import axios from '../../../../../services/Axios/instance'
import { isObject } from '../../../../../utils/Validators'

export const saveSelected = async (
  id: number,
  user_ids: number[],
  region_id: number,
  hierarchy_id: number,
): Promise<void> => {
  const params = { region_id, user_ids, hierarchy_id }

  const { data } = await axios.post(`/v1/tr/regions/${id}/users`, params)

  if (!isObject(data) || !data.success) {
    throw new Error('Invalid Response')
  }
}

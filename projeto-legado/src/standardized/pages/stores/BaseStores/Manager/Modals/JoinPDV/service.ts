import axios from '../../../../../../../services/Axios'

export const unifiedStores = async (
  unified_id: number,
  ids: number[],
): Promise<void> => {
  const params = {
    ids,
    unified_id,
  }

  await axios.post('/v1/tr/stores/unify-ids', params)
}

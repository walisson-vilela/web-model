import axios from '../../../../services/Axios'

/**
 * PUT para /v1/distribution-center-historics/reprocess/20
 * [stores, apportionment]
 */

export const reprocess = async (
  distribution_center_id: number,
  toReprocess: string[],
): Promise<any> => {
  const { data } = await axios.put(
    `/v1/distribution-center-historics/reprocess/${distribution_center_id}`,
    toReprocess,
  )

  return data
}

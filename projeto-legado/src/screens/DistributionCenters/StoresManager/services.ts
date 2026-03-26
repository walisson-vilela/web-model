import axios from '../../../services/Axios'

export const transferStores = async (
  distribution_center_id: number,
  ids: number[],
): Promise<any> => {
  const { data } = await axios.post(
    `v1/distribution-centers/${distribution_center_id}/stores`,
    ids,
  )
  return data
}

export const getInside = async (
  distribution_center_id: number,
  search: string,
  page: number,
): Promise<any> => {
  const params: any = {
    limit: 200,
    contain: ['DistributionCenters', 'DistributionCentersMany'].join(),
    page,
  }

  if (search) params.q = search

  const { data } = await axios.get(
    `v1/distribution-centers/${distribution_center_id}/stores`,
    { params },
  )

  return data
}

export const getOutside = async (
  search: string,
  page: number,
): Promise<any> => {
  const params: any = {
    contain: ['DistributionCenters', 'DistributionCentersMany'].join(),
    page,
    limit: 200,
  }

  if (search) params.q = search

  const { data } = await axios.get('/v1/stores', { params })

  return data
}

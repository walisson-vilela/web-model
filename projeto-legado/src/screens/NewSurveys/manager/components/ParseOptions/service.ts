import { SortState } from '@mw-kit/mw-manager'

import axios from '../../../../../services/Axios'

export const GetConflicts = async (
  id: number,
  codes: number[],
  contain?: string,
  sort?: SortState | null,
  search?: string,
  type?: string,
  extract?: boolean,
): Promise<any> => {
  let params: any = { code: codes.join(',') }

  if (sort) {
    if (type === 'Products') {
      params.sort_products = sort.sort
      params.direction_products = sort.direction
    }
    if (type === 'PDVHierarchy') {
      params.sort_stores = sort.sort
      params.direction_stores = sort.direction
    }
    if (type === 'User') {
      params.sort_peoples = sort.sort
      params.direction_peoples = sort.direction
    }
  }

  if (contain) params.contain = contain
  if (search) params.q = search

  const { data } = await axios.get(
    `/v1/tr/survey-conflicts/index${extract ? '.xlsx' : ''}?/survey_id=${id}`,
    { params },
  )

  if (!data.success) throw new Error('Invalid Request')

  return data
}

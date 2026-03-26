import { SortState } from '@mw-kit/mw-manager'

import axios from '../../../../services/Axios'

interface getParamsArgs {
  search: string
  sort: SortState | null
  page?: number
  limit?: number
}

const getStoresParams = (args: getParamsArgs): any => {
  const { search, sort, page } = { ...args }

  let params: any = {
    limit: 200,
    contain: ['Segments', 'Typologies'],
  }

  if (page) params.page = page

  if (search) {
    params.q = search
    params.q_options = [
      'Stores.name',
      'Stores.formatted_address',
      'Typologies.name',
      'Segments.name',
    ].join()
  }
  if (sort) params = { ...params, ...sort }

  return params
}

export const getStores = async (
  distribution_center_id: number,
  search: string,
  sort: SortState | null,
  page: number,
  historic?: boolean,
): Promise<any> => {
  const endpoint = historic
    ? 'distribution-center-historics'
    : 'distribution-centers'

  const params = getStoresParams({ search, sort, page, limit: 200 })

  const { data } = await axios.get(
    `/v1/${endpoint}/${distribution_center_id}/stores`,
    { params },
  )

  return data
}

export const extractData = async (
  distribution_center_id: number,
  search: string,
  sort: SortState | null,
  historic?: boolean,
): Promise<any> => {
  const endpoint = historic
    ? 'distribution-center-historics'
    : 'distribution-centers'

  const params = getStoresParams({ search, sort, limit: 200 })

  const { data } = await axios.get(
    `/v1/${endpoint}/${distribution_center_id}/stores.xlsx`,
    { params },
  )

  return data
}

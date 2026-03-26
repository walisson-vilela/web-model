import { SortState } from '@mw-kit/mw-manager'

import axios from '../../../../services/Axios'

export const getSharedList = async (
  search: string,
  sort: SortState | null,
  code: string | number,
  extract: boolean = false,
) => {
  const params: any = { 'without-owner': 1 }

  if (search) params.q = search
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  const { data } = await axios.get(
    `/v1/tr/image-gallery/file-favorites/${code}/file-favorite-permissions${
      extract ? '.xlsx' : ''
    }`,
    { params },
  )

  if (data.success !== true) {
    throw new Error('Request return no success')
  }

  return data
}

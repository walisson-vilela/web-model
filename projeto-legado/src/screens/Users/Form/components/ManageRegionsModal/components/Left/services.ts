import { AppliedFilter } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../services/Axios/instance'
import { notEmptyStringOrDefault } from '../../../../../../../standardized/utils/formatters'
import { numberOrDefault } from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'
import { Region } from '../../interfaces'

export const getRegions = async (
  q: string,
  page: number,
  hierarchy_id: number,
  filters: AppliedFilter[],
): Promise<{
  data: Region[]
  lastPage: boolean
}> => {
  const params = {
    page,
    hierarchy_id,

    ...filters.reduce(
      (params, { name, value }) => ({
        ...params,
        [name]: value,
      }),
      {},
    ),

    ...(q ? { q } : {}),
  }

  const { data: response } = await axios.get('v1/tr/regions/options', {
    params,
  })

  if (
    !isObject(response) ||
    !response.success ||
    !Array.isArray(response.data)
  ) {
    throw new Error('invalid response')
  }

  const data = response.data.reduce<Region[]>((parsed, e) => {
    if (!isObject(e)) return parsed

    const region_id = numberOrDefault(e.id)
    if (!region_id) return parsed

    const data: Region = {
      region_id,
      name: notEmptyStringOrDefault(e.name, ''),
    }

    return [...parsed, data]
  }, [])

  const lastPage =
    !isObject(response.pagination) || !response.pagination.has_next_page

  return {
    data,
    lastPage,
  }
}

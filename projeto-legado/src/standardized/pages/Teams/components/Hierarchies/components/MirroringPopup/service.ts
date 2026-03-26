import axios from '../../../../../../../services/Axios'
import {
  booleanOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../utils/validators'

import { parserMirroring } from './parser'

export const getMirroringUsers = async (
  hierarchy_id: number,
  id: number,
  page: number,
) => {
  const params = {
    page,
  }
  const { data: response } = await axios.get(
    `/v1/tr/hierarchies/${hierarchy_id}/mirrorings/${id}`,
    { params },
  )

  if (!isObject(response) || !Array.isArray(response.data)) {
    throw new Error('Invalid response')
  }

  return {
    data: parserMirroring(response.data),
    pagination: {
      has_next_page: false,
      page: 1,
      count: 0,
      ...(isObject(response.pagination)
        ? {
            has_next_page: booleanOrDefault(
              response.pagination.has_next_page,
              false,
            ),
            count: numberOrDefault(response.pagination.count, 0),
            page: numberOrDefault(response.pagination.current_page, 1),
          }
        : {}),
    },
  }
}

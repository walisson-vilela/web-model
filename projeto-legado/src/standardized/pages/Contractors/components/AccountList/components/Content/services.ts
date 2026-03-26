import axios from '../../../../../../../services/Axios'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'

import { Row } from './interfaces'

export const getRows = async (id: number, search?: string): Promise<Row[]> => {
  const params = {
    ...(search ? { q: search } : {}),
    sort: 'nickname',
  }

  const { data: response } = await axios.get(
    `v1/tr/contractors/${id}/subcontractors`,
    {
      params,
    },
  )

  if (!isObject(response)) return []
  if (!Array.isArray(response.data)) return []

  const rows = response.data.reduce<Row[]>((rows, response) => {
    if (!isObject(response)) return rows

    const row: Row = {
      id: numberOrDefault(response.id),
      name: notEmptyStringOrDefault(response.nickname),
      avatar: isObject(response.avatar)
        ? {
            id: numberOrDefault(response.avatar.id),
            name: notEmptyStringOrDefault(response.avatar.name),
            url: notEmptyStringOrDefault(response.avatar.url),
          }
        : null,
    }

    return [...rows, row]
  }, [])

  return rows
}

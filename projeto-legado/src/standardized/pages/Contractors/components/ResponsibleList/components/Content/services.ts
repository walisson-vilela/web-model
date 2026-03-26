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
  }

  const { data: response } = await axios.get(`v1/tr/contractors/${id}/users`, {
    params,
  })

  if (!isObject(response)) return []
  if (!Array.isArray(response.data)) return []

  const rows = response.data.reduce<Row[]>((rows, response) => {
    if (
      !isObject(response) ||
      !isObject(response.role) ||
      !isObject(response.person)
    ) {
      return rows
    }

    const row: Row = {
      id: numberOrDefault(response.id),
      name: notEmptyStringOrDefault(response.name),
      re: notEmptyStringOrDefault(response.person.registration),
      role: {
        id: numberOrDefault(response.role.id),
        name: notEmptyStringOrDefault(response.role.name),
      },
    }

    return [...rows, row]
  }, [])

  return rows
}

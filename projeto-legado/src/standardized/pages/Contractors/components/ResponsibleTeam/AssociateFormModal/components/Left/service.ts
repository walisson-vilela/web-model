import axios from '../../../../../../../../services/Axios/instance'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/validators'
import { AssociatedUser } from '../../../types'

const parseUserAssociated = (data: unknown[]): AssociatedUser[] => {
  return data.reduce<AssociatedUser[]>(
    (userAssociated, nextUserAssociated): AssociatedUser[] => {
      if (!isObject(nextUserAssociated)) return userAssociated

      const id = numberOrDefault(nextUserAssociated.id)
      if (!id) return userAssociated

      if (!isObject(nextUserAssociated.role)) return userAssociated

      const roleId = numberOrDefault(nextUserAssociated.role.id)
      if (!roleId) return userAssociated

      const checkUserAssociated: AssociatedUser = {
        person_id: id,
        name: notEmptyStringOrDefault(nextUserAssociated.name),
        role: {
          id: roleId,
          name: notEmptyStringOrDefault(nextUserAssociated.role.name),
          master: booleanOrDefault(nextUserAssociated.role.master, false),
        },
        administrator: false,
        menu_ids: [],
      }

      return [...userAssociated, checkUserAssociated]
    },
    [],
  )
}

export const getUsersAssociated = async (
  search: string,
): Promise<AssociatedUser[]> => {
  const params = {
    ...(search ? { q: search } : {}),
    internal_access: 1,
  }
  const { data: response } = await axios.get('/v1/tr/users/options', {
    params,
  })
  if (!isObject(response)) throw new Error('invalid response')
  if (!response.success) throw new Error('invalid response')
  if (!Array.isArray(response.data)) throw new Error('invalid response')

  return parseUserAssociated(response.data)
}
